import { init_sketch } from "./p5/sketch.js";
import { init_melody } from "./melody/melody.js";

function main() {
	window.s = init_sketch();
	init_melody();
	document.getElementById("start-btn").addEventListener("click", () => {
		document.body.classList.add("started");
		document.dispatchEvent(new CustomEvent("start"));
	});
}

window.addEventListener("DOMContentLoaded", main, false);

// prevent scroll on mobile
document.addEventListener("touchmove", (e) => e.preventDefault(), false);
