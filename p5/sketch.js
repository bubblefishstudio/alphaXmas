import * as cst from "./parameters.js";
import * as m from "./model.js";
import { sleep } from "../utils.js";

export const sketch = (p) => {

	let tree, g, epochs = 20;

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

		// continue growing
		let_it_grow();

		console.log("tree loaded, drawing");
	};

	p.draw = function() {
		p.background(60);
		p.stroke(255);

		p.rotateY(p.frameCount * 0.02);
		p.rotateX(p.sin(p.frameCount/50) * p.radians(5));

		tree.draw();
	};

};
