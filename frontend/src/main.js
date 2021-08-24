import { sketch } from "./p5/sketch.js";
import { loadMelody } from "./melody/melody.js";

// load soundfont (patch)
music21.common.urls.soundfontUrl = "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/"

function main() {
	new p5(sketch);
	loadMelody().then(m => { console.log("melody loaded, playing"); m.playStream(); });
}


window.addEventListener("DOMContentLoaded", main, false);
