import * as cst from "./parameters.js";
import * as m from "./model.js";
import { sleep } from "../utils.js";

export const sketch = (p) => {

	let tree, g, epochs = 15;

	async function let_it_grow() {
		while (epochs-- > 0) {
			await g.generate();
			await tree.compile(g.state);
			await sleep(1000);
		}
	}

	p.setup = function() {
		p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);

		// load model
		g = new m.Grammar(cst.grammar_axiom, cst.grammar_rules);
		tree = new m.Tree(p, cst.commands);

		// debug
		window.g = g;
		window.tree = tree;

		// continue growing
		let_it_grow();

		console.log("tree loaded, drawing");
	};

	p.draw = function() {
		p.background(70);

		p.camera(-(p.mouseX-p.width/2), -p.height/8 - (p.mouseY-p.height/2), p.height, 0, 0, 0, 0, 1, 0);
		p.rotateY(p.frameCount * 3e-3);

		tree.draw();
	};

};
