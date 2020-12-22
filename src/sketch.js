let axiom = "FTZFFF";
let sentence = axiom;
let angles, len, epoch=0;

let rules = [
  {
    a:"T",
    b:"/!FFBBBBBBT"
  },
  {
    a:"B",
    b:"////[++++FY]",
  },
  {
    a: "W",
    b: "!+X[-W]Z?"
  },
  {
    a: "X",
    b: "-W[+X]Z"
  },
  {
    a: "Y",
    b: "Z!Y?"
  },
  {
    a: "Z",
    b: "[--FFF][++FFF]F"
  },
];

let commands = {
  "F": () => {
    line(0,0,0, 0,0,len);
    translate(0,0,len);
  },
  "f": () => {
    translate(0,0,len);
  },
  "+": () => {
    rotateY(-angles);
  },
  "-": () => {
    rotateY(angles);
  },
  "ˆ": () => {
    rotateX(angles);
  },
  "&": () => {
    rotateX(-angles);
  },
  "\\": () => {
    rotateZ(angles);
  },
  "/": () => {
    rotateZ(-angles);
  },
  "|": () => {
    rotateY(PI);
  },
  "[": () => {
    push();
  },
  "]": () => {
    pop();
  },
  "!": () => {
    len *= 0.9;
  },
  "?": () => {
    len /= 0.9;
  },
  "'": () => {
    // nothing for now
    // change color
  },
};

function generate() {
  let nextsentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextsentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextsentence += current;
    }
  }
  sentence = nextsentence;
  console.log(sentence);
  leaf();
}

//functions
function leaf() {
  len = 5 + (epoch++)*0.5;
  background(51);
  stroke(255, 100);
  // set origin and axes rotation
  translate(0, height / 2);
  rotateX(PI/2);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (commands[current] !== undefined)
      commands[current]();
  }
}

function setup() {
  angles=radians(15);
  createCanvas(600, 400, WEBGL);
  background(51);
  console.log(sentence);
  leaf();
  let button = createButton("Generate");
  button.mousePressed(generate);
}

function draw() {
  
}