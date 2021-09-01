import p5 from "p5";

// save shape as Geometry from immediate mode
p5.RendererGL.prototype.saveShape = function() {
	this._processVertices(...arguments);
	this.isBezier = false;
	this.isQuadratic = false;
	this.isCurve = false;
	this.immediateMode._bezierVertex.length = 0;
	this.immediateMode._quadraticVertex.length = 0;
	this.immediateMode._curveVertex.length = 0;

	// patch and return geometry
	let g = this.immediateMode.geometry;

	this._savedShapesCount = this._savedShapesCount+1 || 0;
	g.gid = "saved|" + this._savedShapesCount; // assign gid to cache buffer
	g._makeTriangleEdges = function() { return this; }; // shadow this function to avoid loosing edges when `model(...)` is called

	// assign a new geometry to immediateMode to avoid pointer aliasing
	this.immediateMode.geometry = new p5.Geometry();

	return g;
};

p5.prototype.saveShape = function() {
	if (this._renderer.isP3D) {
		return this._renderer.saveShape(...arguments);
	} else {
		console.warn("Don't use saveShape in 2D mode.");
	}
};
