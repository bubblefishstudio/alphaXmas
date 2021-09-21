import p5 from "p5";

import * as cst from "./parameters.js";
import { Grammar } from "./lsystem.js";
import { Tree } from "./model.js";
import { Observer } from "./observer.js";


const sketch = (p) => {

	//p.disableFriendlyErrors = true;

	let tree, g, obs;

	p.setup = function() {
		p.createCanvas(visualViewport && visualViewport.width || window.innerWidth, visualViewport && visualViewport.height || window.innerHeight, p.WEBGL);

		// load observer
		obs = new Observer(p);

		// load model
		g = new Grammar(cst.grammar_axiom, cst.grammar_rules);
		tree = new Tree(p, g, cst.commands);

		// bind note play
		document.addEventListener("notePlayed", (e) => tree.handle_note(e.detail));

		// debug
		window.g = g;
		window.tree = tree;
		window.obs = obs;

		// continue growing
		tree.start_growing(cst.epochs);

		console.log("tree loaded, drawing");

		//p.debugMode();
	};

	p.draw = function() {
		p.background(70);

		// camera & rotation
		obs.adjustCamera();
		p.rotateZ(p.frameCount * 2e-3);
		//p.orbitControl();

		// ground
		const size = Math.max(p.width, p.height)*20;
		p.noStroke();
		p.fill(60);
		p.plane(size, size);

		// light
		p.lights();

		// finally, the tree
		tree.draw();
	};

};

export function init_sketch() {
	return new p5(sketch);
}
