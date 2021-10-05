import { init_sketch } from "./p5/sketch.js";
import { init_melody } from "./melody/melody.js";

let sketch_loaded = false,
    melody_loaded = false;

function main() {
	window.s = init_sketch();
	init_melody();
	document.getElementById("start-btn").addEventListener("click", () => {
		document.body.classList.add("started");
		document.dispatchEvent(new CustomEvent("start"));
	});
}

function updateLoadingStatus(e) {
	if (e.type == "melody-loaded")
		melody_loaded = true;
	else if (e.type == "sketch-loaded")
		sketch_loaded = true;

	if (melody_loaded && sketch_loaded)
		document.body.classList.remove("loading");
}

document.addEventListener("sketch-loaded", updateLoadingStatus);
document.addEventListener("melody-loaded", updateLoadingStatus);

window.addEventListener("DOMContentLoaded", main, false);

// prevent scroll on mobile
document.addEventListener("touchmove", (e) => e.preventDefault(), false);
