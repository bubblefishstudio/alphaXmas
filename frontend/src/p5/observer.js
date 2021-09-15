import * as posenet from "@tensorflow-models/posenet";
import p5 from "p5";

export class Observer {
	constructor(cvs) {
		this.scale = 0.8;
		this._cvs = cvs;
		this._position = new p5.Vector(0,0);
		this._cam = this._cvs.createCapture(this._cvs.VIDEO, () => this._setupNet());
		this._cam.hide();
	}

	async _setupNet() {
		this._net = await posenet.load();
		this._updatePosition();
	}

	async _updatePosition() {
		let pose = await this._net.estimateSinglePose(this._cam.elt, { flipHorizontal: true });
		let p = pose.keypoints.filter(k => k.part === "nose")[0].position;
		// webcam orinig is top left, we want it to be bottom left
		this._position.x = (p.x / this._cam.width - 0.5) * this._cvs.width * this.scale;
		this._position.y = -(p.y / this._cam.height - 0.5) * this._cvs.height * this.scale;
		requestAnimationFrame(() => this._updatePosition());
	}

	adjustCamera() {
		const p = this._cvs;
		// left hand rule
		p.camera(this._position.x, p.height, p.height + this._position.y, 0, 0, p.height/2, 0, 0, -1);
	}
}


