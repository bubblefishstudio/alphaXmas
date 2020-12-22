let sentence, angles, len, epoch, melody;

let rules = new Map(); // defined externally

fetch("./tree_rules.tsv").then(resp => resp.text()).then(body => {
	body.split("\n").slice(1).forEach(row => {
		if (row.length > 0) {
			let [a, b] = row.split("\t");
			rules.set(a, b);
		}
	})
});

// load melody and soundfont
music21.common.urls.soundfontUrl = "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/"
loadMelody().then(m => { melody = m });

let commands = new Map([
	["F", () => {
		line(0,0,0, 0,0,len);
		translate(0,0,len);
	}],
	["f", () => {
		translate(0,0,len);
	}],
	["+", () => {
		rotateY(-angles);
	}],
	["-", () => {
		rotateY(angles);
	}],
	["ˆ", () => {
		rotateX(angles);
	}],
	["&", () => {
		rotateX(-angles);
	}],
	["\\", () => {
		rotateZ(angles);
	}],
	["/", () => {
		rotateZ(-angles);
	}],
	["|", () => {
		rotateY(PI);
	}],
	["[", () => {
		push();
	}],
	["]", () => {
		pop();
	}],
	["!", () => {
		len *= 0.9;
	}],
	["?", () => {
		len /= 0.9;
	}],
	["'", () => {
		// nothing for now
		// change color
	}],
]);

function generate(sentence) {
	let nextsentence = "";
	for (let i = 0; i < sentence.length; i++) {
		let current = sentence.charAt(i);
		let replacement = rules.get(current) || current;
		nextsentence += replacement;
	}
	return nextsentence;
}

// p5.js functions

function setup() {
	const axiom="FTZFFF";
	angles = radians(15);
	sentence = axiom;
	epoch = 0;

	createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	background(51);
	frameRate(1);

	noLoop(); // start afterwards
}

function mousePressed() {
	console.log("Started");
	if (melody !== undefined)
		m.playStream()
		loop();
}

function draw() {
	console.log("draw")
	if (epoch > 15) {
		console.log("Epoch limit reched");
		noLoop();
		return;
	} // stop after 10 iterations

	epoch++;
	sentence = generate(sentence);
	len = height/50 + epoch * 0.5;

	background(51);
	stroke(255, 100);

	// set origin and axes rotation
	translate(0, height / 2);
	rotateX(PI/2);

	for (let i = 0; i < sentence.length; i++) {
		let current = sentence.charAt(i);
		if (commands.get(current) !== undefined)
			commands.get(current)();
	}
}


// melody generation from keras pre-trained model

async function loadMelody() {
	const model = await tf.loadLayersModel('./keras_model/model.json')
	// HARDCODED FROM TRAINED MODEL (check Colab) ---
	const pitch_vocab_size = 34
	const duration_vocab_size = 29
	// ----------------------------------------------
	const seed = [parseInt(Math.random() * pitch_vocab_size + 1), parseInt(Math.random() * duration_vocab_size + 1)]
	const mel_vec = generateMelodyVector(model, seed, 80)
	return vec2midi(mel_vec)
}

function generateMelodyVector(model, seed, maxlen = 80) {
	let input_eval = tf.expandDims(seed, 0)

	generated = [seed]
	model.reset_states()

	for (let i = 0; i < maxlen; i++) {
		let [p_pred, d_pred] = model(input_eval)
		p_id = p_pred.argMax(-1).arraySync()[0][0]
		d_id = d_pred.argMax(-1).arraySync()[0][0]
		input_eval = tf.expand_dims([[p_id, d_id]], 0)
		if (p_id != 0 && d_id != 0) {
			generated.push([p_id, d_id])
		} else {
			console.log("padding... skip")
			if (p_id != d_id)
				console.log("Pitch and duration don't agree on zero... interesting")
		}
	}
}

function vec2midi(vec) {
	const Fraction = (a,b) => a/b;
	// HARDCODED FROM TRAINED MODEL (check Colab) ---
	const pitch_vocab = [null,48,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,81,83]
	const dur_vocab = [Fraction(1,12),Fraction(1,6),0.25,Fraction(1,3),0.5,Fraction(2,3),0.75,1.0,Fraction(13,12),1.25,Fraction(4,3),1.5,Fraction(5,3),1.75,2.0,2.25,Fraction(7,3),2.5,2.75,3.0,3.25,3.5,3.75,4.0,4.25,4.5,6.0,7.0,8.0]
	// ----------------------------------------------
	const m21 = music21
	let stream = m21.stream.Stream()
	for (let [i,j] of vec) {
		let pitch = pitch_vocab[i-1]
		let duration = dur_vocab[j-1]
		let note
		if (pitch === null)
			note = m21.note.Rest(duration)
		else
			note = m21.note.Note(pitch, duration)
		stream.append(note)
	}
	return stream
}
