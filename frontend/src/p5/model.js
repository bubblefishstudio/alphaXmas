import p5 from "p5";
import "./patches.js";

import { sleep } from "../utils.js";
import { Turtle } from "./lsystem.js";

export class Tree {
	constructor(cvs, gram, cmds) {
		this._cvs = cvs;
		this._grammar = gram;
		this._cmds = cmds;
		this._branch_geom = new p5.Geometry();
		this._leaf_geom = new p5.Geometry();
		this._lights_vtx = new p5.Geometry();
		this._lights_colors = ["red", "yellow", "blue", "purple"];
	}

	_compile() {
		let state = {
			len: this._cvs.height / 20,
			angle: 15,
			vtx: [],
			leaf_vtx: [],
			lights: [],
			stack: [],
			turtle: new Turtle(),
			glue: -1,
		};

		// compute vertices from turtle movements
		for (let [op, arg] of this._grammar.state) {
			let action = this._cmds.get(op);
			if (action instanceof Function) {
				action(state, arg);
			}
		}

		// prepare geometries (see patches.js)
		const p = this._cvs;
		const addVtx = (v) => p.vertex(v.x, v.y, v.z);

		// tree branches
		p.beginShape(p.LINES);
		p.noFill();
		state.vtx.forEach(addVtx);
		this._branch_geom = p.saveShape();

		// tree leafs
		p.beginShape(p.LINES);
		p.noFill();
		state.leaf_vtx.forEach(addVtx);
		this._leaf_geom = p.saveShape();

		// tree lights
		this._lights_vtx = state.lights.map(v => v.add(0,0,-3));

		return this;
	}

	async start_growing(epochs) {
		while (epochs-- > 0) {
			this._grammar.generate();
			this._compile();
			await sleep(1000/1.5 * 4);
		}
	}

	rotate_lights() {
		let latest = this._lights_colors.slice(1);
		this._lights_colors = latest.concat(this._lights_colors[0]);
	}

	add_star() {
		// TODO
	}

	draw() {
		const p = this._cvs;
		p.noFill();

		// draw tree branches
		p.stroke(150, 100, 0);
		p.strokeWeight(3);
		p.model(this._branch_geom);

		// draw tree leafs
		p.stroke(50, 200, 100);
		p.strokeWeight(0.5);
		p.model(this._leaf_geom);

		// draw tree lights
		p.strokeWeight(5);
		for (let i = 0; i < this._lights_vtx.length; i++) {
			p.stroke(this._lights_colors[i % this._lights_colors.length]);
			p.point(this._lights_vtx[i]);
		}
	}
}
