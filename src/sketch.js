let sentence, angles, len, epoch;

let rules = new Map(); // defined externally

fetch("./tree_rules.tsv").then(resp => resp.text()).then(body => {
	body.split("\n").slice(1).forEach(row => {
		if (row.length > 0) {
			let [a, b] = row.split("\t");
			rules.set(a, b);
		}
	})
});

let commands = new Map([
	["F", () => {
		line(0,0,0, 0,0,len);
		translate(0,0,len);
	}],
	["f", () => {
		translate(0,0,len);
	}],
	["+", () => {
		rotateY(-angles);
	}],
	["-", () => {
		rotateY(angles);
	}],
	["ˆ", () => {
		rotateX(angles);
	}],
	["&", () => {
		rotateX(-angles);
	}],
	["\\", () => {
		rotateZ(angles);
	}],
	["/", () => {
		rotateZ(-angles);
	}],
	["|", () => {
		rotateY(PI);
	}],
	["[", () => {
		push();
	}],
	["]", () => {
		pop();
	}],
	["!", () => {
		len *= 0.9;
	}],
	["?", () => {
		len /= 0.9;
	}],
	["'", () => {
		// nothing for now
		// change color
	}],
]);

function generate(sentence) {
	let nextsentence = "";
	for (let i = 0; i < sentence.length; i++) {
		let current = sentence.charAt(i);
		let replacement = rules.get(current) || current;
		nextsentence += replacement;
	}
	return nextsentence;
}

// p5.js functions

function setup() {
	const axiom="FTZFFF";
	angles = radians(15);
	sentence = axiom;
	epoch = 0;

	createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	background(51);
	frameRate(1);

	noLoop(); // start afterwards
}

function mousePressed() {
	console.log("Started");
	loop();
}

function draw() {
	console.log("draw")
	if (epoch > 15) {
		console.log("Epoch limit reched");
		noLoop();
		return;
	} // stop after 10 iterations

	epoch++;
	sentence = generate(sentence);
	len = height/50 + epoch * 0.5;

	background(51);
	stroke(255, 100);

	// set origin and axes rotation
	translate(0, height / 2);
	rotateX(PI/2);

	for (let i = 0; i < sentence.length; i++) {
		let current = sentence.charAt(i);
		if (commands.get(current) !== undefined)
			commands.get(current)();
	}
}
