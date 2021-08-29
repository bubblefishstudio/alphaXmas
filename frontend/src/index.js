import { init_sketch } from "./p5/sketch.js";
import { loadMelody } from "./melody/melody.js";

function main() {
	window.s = init_sketch();
	loadMelody().then(m => { console.log("melody loaded, playing"); m.playStream(); });
}

window.addEventListener("DOMContentLoaded", main, false);

// prevent scroll on mobile
window.addEventListener("scroll", (e) => e.preventDefault(), false);
