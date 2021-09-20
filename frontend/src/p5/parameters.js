import { Grammar } from "./lsystem.js";

export const epochs = 18;

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
	["O", (s, n) => {
		if (Math.random() < 0.3) {
			s.lights.push(s.turtle.position);
		}
	}],
	["*", (s, n) => {
		s.star = s.turtle.position;
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

export const grammar_axiom = Grammar.parse("!2 H T X *");

export const grammar_rules = new Map([
	["D",  (n=1) => n > 1 ? [["D", n-1]] : [["F", n]]],  // delay stroke

	["H",  (_) => Grammar.parse("F0.4 ! H ?")],
	["T",  (_) => Grammar.parse("/n /30 ! D3.2 B B B T", Math.random()*10)],
	["B",  (_) => Grammar.parse("/n /120 [ | ^n ^50 D2.5 ! Y ? ] Dn", Math.random()*20, Math.random()*10, Math.random()/2+2)],

	["Y",  (_) => Grammar.parse("X I ! V ?")],
	["I",  (_) => Grammar.parse("+n X !0.6 I ?0.6", Math.random()*4-2)],
	["V",  (_) => Grammar.parse("D0.2 [ /20 +50 X ! I I ? ] D0.1 [ \\20 -50 X ! I I ? ] !0.8 Y ?0.8")],

	["X",  (_) => Grammar.parse("^n E E E E E E D0.05 O", Math.random()*3)],
	["E",  (_) => Grammar.parse("/60 [ &70 L0.5 ] F0.05")],
]);
