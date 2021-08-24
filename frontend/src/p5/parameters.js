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

export const grammar_axiom = Grammar.parse("F3 T");

export const grammar_rules = new Map([
	["T",  (_) => Grammar.parse("/15 ! F2 B B B B B B T")],
	["B",  (_) => Grammar.parse("/60 [ | ^45 F Y ]")],
	["Y",  (_) => Grammar.parse("Z ! Y ?")],
	["Z",  (_) => Grammar.parse("^5 [ /15 -30 F3 ] [ \\15 +30 F3 ] [ &30 F3 ] F")],
]);
