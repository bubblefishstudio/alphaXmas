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
	["!", (s, n=0.9) => {
		s.len *= n;
	}],
	["?", (s, n=0.9) => {
		s.len /= n;
	}],
]);

export const grammar_axiom = Grammar.parse("!2 H T Z");

export const grammar_rules = new Map([
	["D",  (n=1) => n > 1 ? [["D", n-1]] : [["F", n]]],  // delay stroke

	["H",  (_) => Grammar.parse("F0.5 ! H ?")],
	["T",  (_) => Grammar.parse("/30 ! D3.4 B B B T")],
	["B",  (_) => Grammar.parse("/120 [ | ^50 D2.5 ! W ? ] D2.2")],

	["Y",  (_) => Grammar.parse("D0.2 [ /20 +50 Z ! I I ? ] D0.1 [ \\20 -50 Z ! I I ? ] !0.8 W ?0.8")],
	["I",  (_) => Grammar.parse("Z !0.6 I ?0.6")],
	["W",  (_) => Grammar.parse("Z I ! Y ?")],

	["Z",  (_) => [["^", parseInt(Math.random()*4)]].concat(Grammar.parse("E E E E E E D0.05"))],
	["E",  (_) => Grammar.parse("/60 [ &70 L0.5 ] F0.05")],
]);
