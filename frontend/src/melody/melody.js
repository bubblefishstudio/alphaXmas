window.m21config = { loadSoundfont: false };

import * as m21 from "music21j";
import * as tf from "@tensorflow/tfjs";

import seeds from "./seeds.js";

// load soundfont (patch)
m21.common.urls.soundfontUrl = "https://gleitz.github.io/midi-js-soundfonts/MusyngKite/";

export async function init_melody() {
	let m = await loadMelody()
	console.log("melody loaded")

	await new Promise(resolve =>
		m21.miditools.loadSoundfont("music_box", i => {
			m.instrument = i
			resolve()
		})
	)
	console.log("instrument loaded")

	const loopPlay = () => {
		m.playStream({done: loopPlay, tempo: 90})
	}
	document.addEventListener("start", loopPlay)
}

async function loadMelody() {
	const model = await tf.loadLayersModel('./keras_model/model.json')
	const idx = (parseInt(location.hash.slice(1)) + 1 || parseInt(Math.random() * seeds.length) + 1) - 1
	location.hash = idx
	const seed = seeds[idx]
	const mel_vec = generateMelodyVector(model, seed, 40)
	//console.log(mel_vec)
	const stream = vec2midi(mel_vec)
	detectCadence(stream)
	return stream
}

function generateMelodyVector(model, seed, maxlen = 80) {
	let input_eval = tf.expandDims(seed, 0)

	let generated = [...seed]
	model.resetStates()

	for (let i = 0; i < maxlen; i++) {
		let [p_pred, d_pred] = model.predict(tf.unstack(input_eval, -1))
		let d_id = tf.multinomial(tf.squeeze(d_pred, 0), 1).arraySync().pop()[0]
		let p_id = tf.multinomial(tf.squeeze(p_pred, 0), 1).arraySync().pop()[0]
		input_eval = tf.expandDims([[p_id, d_id]], 0)
		if (p_id != 0 && d_id != 0) {
			generated.push([p_id, d_id])
		} else {
			console.log("padding... skip")
			if (p_id != d_id)
				console.log("Pitch and duration don't agree on zero... interesting")
		}
	}

	return generated
}

function vec2midi(vec) {
	const Fraction = (a,b) => a/b;
	// HARDCODED FROM TRAINED MODEL (check Colab) ---
	const pitch_vocab = [null,48,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,81,83]
	const dur_vocab = [Fraction(1,12),Fraction(1,6),0.25,Fraction(1,3),0.5,Fraction(2,3),0.75,1.0,Fraction(13,12),1.25,Fraction(4,3),1.5,Fraction(5,3),1.75,2.0,2.25,Fraction(7,3),2.5,2.75,3.0,3.25,3.5,3.75,4.0,4.25,4.5,6.0,7.0,8.0]
	// ----------------------------------------------
	let stream = new m21.stream.Stream()
	for (let [i,j] of vec) {
		let pitch = pitch_vocab[i-1]
		let duration = dur_vocab[j-1]
		let note
		if (pitch === null)
			note = new m21.note.Rest(duration)
		else
			note = new m21.note.Note(pitch, duration)
		// add hook
		let oldPlayMidi = note.playMidi;
		note.playMidi = function() {
			document.dispatchEvent(new CustomEvent("notePlayed", {detail: this}))
			oldPlayMidi.call(this, ...arguments)
		}
		stream.append(note)
	}
	return stream
}

function detectCadence(s) {
	const notes = s.notes
	for (let i = 0; i < notes.length; i++) {
		if (notes.get(i).name == "C" && (
			(notes.get(i-1).name == "D") ||
			(notes.get(i-1).name == "B") ||
			(notes.get(i-1).name == "G" && notes.get(i-2).name == "D")
		))
			notes.get(i).cadence = true;
	}
}
