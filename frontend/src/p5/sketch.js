import p5 from "p5";

import * as cst from "./parameters.js";
import * as m from "./model.js";
import { Observer } from "./observer.js";
import { sleep } from "../utils.js";


const sketch = (p) => {

	//p.disableFriendlyErrors = true;

	let tree, g, obs, epochs = 18;

	async function let_it_grow() {
		while (epochs-- > 0) {
			g.generate();
			tree.compile(g.state);
			await sleep(1000/1.5 * 4);
		}
	}

	p.setup = function() {
		p.createCanvas(visualViewport && visualViewport.width || window.innerWidth, visualViewport && visualViewport.height || window.innerHeight, p.WEBGL);

		// load observer
		obs = new Observer(p);

		// load model
		g = new m.Grammar(cst.grammar_axiom, cst.grammar_rules);
		tree = new m.Tree(p, cst.commands);

		// bind note play
		document.addEventListener("notePlayed", () => tree.rotate_lights());
		document.addEventListener("cadence", () => tree.add_star());

		// debug
		window.g = g;
		window.tree = tree;
		window.obs = obs;

		// continue growing
		let_it_grow();

		console.log("tree loaded, drawing");

		//p.debugMode();
	};

	p.draw = function() {
		p.background(70);

		// camera & rotation
		obs.adjustCamera();
		//p.rotateZ(p.frameCount * 2e-3);
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
