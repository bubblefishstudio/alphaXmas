import * as cst from "./parameters.js";
import * as m from "./model.js";

export const sketch = (p) => {

	let tree;

	p.setup = function() {
		p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);

		// load model
		let g = new m.Grammar(cst.grammar_axiom, cst.grammar_rules).epoch(20);
		tree = new m.Tree(p).compile(g.state, cst.commands);

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
