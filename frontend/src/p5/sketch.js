import p5 from "p5";

import * as cst from "./parameters.js";
import * as m from "./model.js";
import { sleep } from "../utils.js";


const sketch = (p) => {

	//p.disableFriendlyErrors = true;

	let tree, g, epochs = 15;

	async function let_it_grow() {
		while (epochs-- > 0) {
			g.generate();
			tree.compile(g.state);
			await sleep(1332);
		}
	}

	p.setup = function() {
		p.createCanvas(visualViewport && visualViewport.width || window.innerWidth, visualViewport && visualViewport.height || window.innerHeight, p.WEBGL);

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

		// camera & rotation
		p.camera(-(p.mouseX-p.width/2), p.height, p.height + (p.mouseY-p.height/2), 0, 0, p.height/2, 0, 0, -1);
		p.rotateZ(p.frameCount * 3e-3);

		// ground
		const size = Math.max(p.width, p.height)*20;
		p.noStroke();
		p.fill(60);
		p.plane(size, size);

		// light
		//p.directionalLight("#000", 100, 100, 0);
		let dirX = (p.mouseX / p.width - 0.5) * 2;
		let dirY = (p.mouseY / p.height - 0.5) * 2;
		//p.directionalLight(255, 0, 0, -dirX, -dirY, -1);
		//p.sphere(50)

		p.lights();

		// finally, the tree
		tree.draw();
	};

};

export function init_sketch() {
	return new p5(sketch);
}
