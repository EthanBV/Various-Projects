module BABYLON {

    export class SolidParticle {
        public idx: number;                     // particle global index
        public color = new Color4(1, 1, 1, 1);  // color
        public position = Vector3.Zero();       // position
        public rotation = Vector3.Zero();       // rotation
        public quaternion: Vector4;             // quaternion, will overwrite rotation
        public scale = new Vector3(1, 1, 1);    // scale
        public uvs = new Vector4(0, 0, 1, 1);   // uvs
        public velocity = Vector3.Zero();       // velocity
        public alive = true;                    // alive
        public _pos: number;                    // index of this particle in the global "positions" array
        public _model: ModelShape;              // model shape reference
        public shapeId: number;                 // model shape id
        public idxInShape: number;              // index of the particle in its shape id

        constructor(particleIndex: number, positionIndex: number, model: ModelShape, shapeId: number, idxInShape: number) {
            this.idx = particleIndex;
            this._pos = positionIndex;
            this._model = model;
            this.shapeId = shapeId;
            this.idxInShape = idxInShape;
        }
    }

    export class ModelShape {
        public shapeID: number;
        public _shape: Vector3[];
        public _shapeUV: number[];
        public _positionFunction: (particle: SolidParticle, i: number, s: number) => void;
        public _vertexFunction: (particle: SolidParticle, vertex: Vector3, i: number) => void;

        constructor(id: number, shape: Vector3[], shapeUV: number[], posFunction: (particle: SolidParticle, i: number, s: number) => void, vtxFunction: (particle: SolidParticle, vertex: Vector3, i: number) => void) {
            this.shapeID = id;
            this._shape = shape;
            this._shapeUV = shapeUV;
            this._positionFunction = posFunction;
            this._vertexFunction = vtxFunction;
        }
    }
}


