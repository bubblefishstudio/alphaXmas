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
		this._star_position = new p5.Vector(0,0,0);

		this.add_star(); // debug
	}

	_compile() {
		let state = {
			len: this._cvs.height / 21,
			angle: 15,
			vtx: [],
			leaf_vtx: [],
			lights: [],
			stack: [],
			turtle: new Turtle(),
			glue: -1,
			star: new p5.Vector(0,0,0),
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

		// tree star position
		this._star_position = state.star;

		return this;
	}

	async start_growing(epochs) {
		while (epochs-- > 0) {
			this._grammar.generate();
			this._compile();
			await sleep(1000/1.5 * 4);
		}
	}

	handle_note(note) {
		if (note.cadence)
			this.add_star();
		if (note.isNote)
			this.rotate_lights();
	}

	rotate_lights() {
		let latest = this._lights_colors.slice(1);
		this._lights_colors = latest.concat(this._lights_colors[0]);
	}

	add_star() {
		this._star = new Star(this._cvs, 30, 8, 5);
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

		// draw star
		if (this._star !== undefined) {
			this._star.draw(this._star_position);
		}
	}
}


class Star {
	constructor(cvs, width, depth, tips = 5) {
		this._cvs = cvs;
		this.tips = tips;
		this.width = width;
		this.depth = depth;
		this._compile();
	}

	_compile() {
		const g = new p5.Geometry();
		const w = this.width;

		// add vertices
		g.vertices = [new p5.Vector(0, 0, this.depth), new p5.Vector(0, 0, -this.depth)];

		for (let i = 1; i <= this.tips; i++) {
			g.vertices.push(new p5.Vector(
				w/2 * Math.cos((i - 1/2) * 2*Math.PI/this.tips),
				w/2 * Math.sin((i - 1/2) * 2*Math.PI/this.tips),
				0)
			); // star wedge
			g.vertices.push(new p5.Vector(
				w * Math.cos(i * 2*Math.PI/this.tips),
				w * Math.sin(i * 2*Math.PI/this.tips),
				0)
			); // star tip
		}

		// add faces
		for (let i = 0; i < 2*this.tips; i += 2) {
			// front
			g.faces.push([0, 2+(i),   2+(i+1)]); // right side
			g.faces.push([0, 2+(i+1), 2+(i+2) % (2*this.tips)]); // left side (and wrapping back)
			// back
			g.faces.push([1, 2+(i),   2+(i+1)]); // right side
			g.faces.push([1, 2+(i+1), 2+(i+2) % (2*this.tips)]); // left side (and wrapping back)
		}

		// compute normals
		g.computeNormals();

		// save geometry
		g.gid = "star";
		this.geometry = g;
	}

	draw(pos) {
		const p = this._cvs;

		p.translate(pos); // go up

		// make star holder
		p.stroke("#f7f704");
		p.strokeWeight(2);
		p.line(0,0,0, 0,0,this.width);
		p.translate(0,0,this.width);

		// place star
		p.rotateZ(Math.PI/this.tips); // align wedge with x-axis
		p.rotateY(-Math.PI/2); // put star vertically
		p.fill("#f7f704");
		p.strokeWeight(0.01);
		p.model(this.geometry);
	}
}
