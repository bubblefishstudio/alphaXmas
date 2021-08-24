export class Grammar {
	constructor(axiom, rules) {
		this._state = axiom;
		this._rules = rules;
	}

	get state() {
		return this._state;
	}

	generate() {
		let next_state = "";
		for (let c of this._state) {
			let rewriting = this._rules.get(c) || c;
			next_state += rewriting;
		}
		this._state = next_state;
	}

	epoch(e) {
		for (let i = 0; i < e; i++) {
			this.generate();
		}
		return this;
	}
}

export class Tree {
	constructor(cvs) {
		this._cvs = cvs;
		this._vertices = [];
		this._points = [];
	}

	compile(sentence, cmds) {
		let state = {
			len: this._cvs.height / 20,
			angle: 15,
			vtx: [],
			stack: [],
			turtle: new Turtle(),
			glue: -1,
		};

		for (let c of sentence) {
			let action = cmds.get(c);
			if (action instanceof Function) {
				action(state);
			}
		}

		for (let v of state.vtx) {
			this._vertices.push(this._cvs.vertex.bind(this._cvs, v.x, v.y, v.z));
		}

		this._points = state.vtx;

		return this;
	}

	draw() {
		let p = this._cvs;

		// setup reference frame
		p.translate(0, p.height / 2);
		p.rotateX(p.PI/2);

		// draw tree
		p.noFill();
		p.beginShape(p.LINES);
		this._vertices.forEach(v => v());
		p.endShape();

		// draw vertices
		/*
		p.stroke(255,0,0);
		p.beginShape(p.POINTS);
		this._vertices.forEach(v => v());
		p.endShape();
		*/

	}
}


class Turtle {
	constructor() {
		this._rotation = new Quaternion(1, new p5.Vector(0,0,0)); // no initial rotation
		this._position = new p5.Vector(0,0,0);
	}

	get position() {
		return this._position.copy();
	}

	get head() { // versor of motion
		let h = new p5.Vector(0,0,1);
		return this._rotation.apply(h);
	}

	get side() {
		let r = new p5.Vector(1,0,0);
		return this._rotation.apply(r);
	}

	get ground() {
		let g = new p5.Vector(0,1,0);
		return this._rotation.apply(g);
	}

	pitch(p) {
		let q = Quaternion.from_euclidean(this.side, p);
		this._rotation = q.mult(this._rotation);
	}

	yaw(y) {
		let q = Quaternion.from_euclidean(this.ground, y);
		this._rotation = q.mult(this._rotation);
	}

	roll(r) {
		let q = Quaternion.from_euclidean(this.head, r);
		this._rotation = q.mult(this._rotation);
	}

	flip() {
		this.yaw(180);
	}

	move(len) {
		this._position.add(this.head.mult(len));
	}

	copy() {
		let t = new Turtle();
		t._rotation = this._rotation.copy();
		t._position = this._position.copy();
		return t;
	}
}

class Quaternion { // used to apply rotations on vectors
	constructor(real, pure, copy_vector = true) {
		this._real = real;
		if (copy_vector) {
			this._pure = pure.copy();
		} else {
			this._pure = pure;
		}
	}

	static from_euclidean(axis, angle) {
		let a = p5.prototype.radians(angle) / 2;
		let r = Math.cos(a);
		let p = axis.copy().mult(Math.sin(a));
		return new Quaternion(r, p, false);
	}

	get real() {
		return this._real;
	}

	get pure() {
		return this._pure.copy();
	}

	copy() {
		return new Quaternion(this._real, this._pure);
	}

	conj() {
		let q = this.copy();
		q._pure.mult(-1);
		return q;
	}

	apply(v) {
		return this .mult(new Quaternion(0, v)) .mult(this.conj()) ._pure;
	}

	mult(q) {
		// vw - V·W
		let r = this.real * q.real - this.pure.dot(q.pure);
		// vW + wV + V×W
		let p = (q.pure.mult(this.real)) .add(this.pure.mult(q.real)) .add(this.pure.cross(q.pure));

		return new Quaternion(r, p, false);
	}
}
