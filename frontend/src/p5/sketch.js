import p5 from "p5";

import * as cst from "./parameters.js";
import { Grammar } from "./lsystem.js";
import { Tree } from "./model.js";
import { Observer } from "./observer.js";


const sketch = (p) => {

	//p.disableFriendlyErrors = true;

	let tree, g, obs;

	async function setup_model() {
		g.generate(); // burn one step to get some leaves
		obs.setup();
		tree.setup();

		// bind note play
		document.addEventListener("notePlayed", (e) => tree.handle_note(e.detail));

		// bind tree growing
		document.addEventListener("start", () => tree.start_growing());

		console.log("sketch loaded");
		document.dispatchEvent(new CustomEvent("sketch-loaded"));
	}

	p.setup = function() {
		p.createCanvas(visualViewport && visualViewport.width || window.innerWidth, visualViewport && visualViewport.height || window.innerHeight, p.WEBGL);

		// create objects
		obs = new Observer(p);
		g = new Grammar(cst.grammar_axiom, cst.grammar_rules);
		tree = new Tree(p, g, cst.commands, cst.epochs);

		// debug references
		window.g = g;
		window.tree = tree;
		window.obs = obs;

		setTimeout(setup_model, 50);
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
		if (tree.loaded) {
			tree.draw();
		}
	};

};

export function init_sketch() {
	return new p5(sketch);
}
