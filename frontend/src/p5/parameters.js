import { Grammar } from "./model.js";

export const commands = new Map([
	["F", (s, n=1) => {
		if (s.glue > -1) {
			s.turtle.move(s.len*n);
			s.vtx[s.glue] = s.turtle.position;
		} else {
			s.vtx.push(s.turtle.position);
			s.turtle.move(s.len*n);
			s.vtx.push(s.turtle.position);
			s.glue = s.vtx.length-1;
		}
	}],
	["L", (s, n=1) => {
		s.leaf_vtx.push(s.turtle.position);
		s.turtle.move(s.len*n);
		s.leaf_vtx.push(s.turtle.position);
		s.turtle.move(-s.len*n);  // restore previous position
	}],
	["f", (s, n=1) => {
		s.glue = -1;
		s.turtle.move(s.len*n);
	}],
	["+", (s, n) => {
		s.glue = -1;
		s.turtle.yaw(n);
	}],
	["-", (s, n) => {
		s.glue = -1;
		s.turtle.yaw(-n);
	}],
	["^", (s, n) => {
		s.glue = -1;
		s.turtle.pitch(n);
	}],
	["&", (s, n) => {
		s.glue = -1;
		s.turtle.pitch(-n);
	}],
	["/", (s, n) => {
		s.turtle.roll(n);
	}],
	["\\", (s, n) => {
		s.turtle.roll(-n);
	}],
	["|", (s, n) => {
		s.glue = -1;
		s.turtle.flip();
	}],
	["[", (s, n) => {
		s.stack.push([s.turtle.copy(), s.glue]);
		s.glue = -1;
	}],
	["]", (s, n) => {
		[s.turtle, s.glue] = s.stack.pop();
	}],
	["!", (s, n) => {
		s.len *= 0.9;
	}],
	["?", (s, n) => {
		s.len /= 0.9;
	}],
]);

export const grammar_axiom = Grammar.parse("F4 T");

export const grammar_rules = new Map([
	["T",  (_) => Grammar.parse("/15 ! F B B B B B B T")],
	["B",  (_) => Grammar.parse("/60 [ | ^45 F2 Y ]")],
	["Y",  (_) => Grammar.parse("Z ! Y ?")],
	["Z",  (_) => [["^", parseInt(Math.random()*10)]].concat(Grammar.parse("E E E E E E E E F0.1"))],
	["E",  (_) => Grammar.parse("/45 [ &70 L0.5 ] F0.05")],
]);
