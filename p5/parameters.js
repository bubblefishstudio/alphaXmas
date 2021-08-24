export const commands = new Map([
	["F", (s) => {
		if (s.glue > -1) {
			s.turtle.move(s.len);
			s.vtx[s.glue] = s.turtle.position;
		} else {
			s.vtx.push(s.turtle.position);
			s.turtle.move(s.len);
			s.vtx.push(s.turtle.position);
			s.glue = s.vtx.length-1;
		}
	}],
	["f", (s) => {
		s.glue = -1;
		s.turtle.move(s.len);
	}],
	["+", (s) => {
		s.glue = -1;
		s.turtle.yaw(s.angle);
	}],
	["-", (s) => {
		s.glue = -1;
		s.turtle.yaw(-s.angle);
	}],
	["^", (s) => {
		s.glue = -1;
		s.turtle.pitch(s.angle);
	}],
	["&", (s) => {
		s.glue = -1;
		s.turtle.pitch(-s.angle);
	}],
	["/", (s) => {
		s.turtle.roll(s.angle);
	}],
	["\\", (s) => {
		s.turtle.roll(-s.angle);
	}],
	["|", (s) => {
		s.glue = -1;
		s.turtle.flip();
	}],
	["[", (s) => {
		s.stack.push([s.turtle.copy(), s.glue]);
		s.glue = -1;
	}],
	["]", (s) => {
		[s.turtle, s.glue] = s.stack.pop();
	}],
	["!", (s) => {
		s.len *= 0.9;
	}],
	["?", (s) => {
		s.len /= 0.9;
	}],
	[".", (s) => {
		s.glue = -1;
		s.turtle.pitch(3);
	}],
]);

export const grammar_axiom = "FFFT";

export const grammar_rules = new Map([
	["T",  "/!FFBBBBBBT"],
	["B",  "////[|^^^FY]"],
	["Y",  "Z!Y?"],
	["Z",  ".[/--FFF][\\++FFF][&&FFF]F"],
]);
