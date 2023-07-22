import * as THREE from 'three'
import '../controllers/listeners/microphone'
import { scene } from '../environment/renderer'

export class Wave {
    tubeGeometry: any
    tubeMesh: any
    numPoints = 2000
    amplitude = 0.00001
    frequency = 10
    radius = 0.04
    inputData = []
    points: any = []

    constructor() {
        for (let i = 0; i < this.numPoints; i++) {
            const x = (i / this.numPoints) * 4 * Math.PI
            const y = this.amplitude * Math.sin(this.frequency * x)
            this.points.push(new THREE.Vector3(x, y))
        }
        this.tubeGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(this.points),
            this.numPoints - 1,
            this.radius,
            8,
            false
        )

        const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
        this.tubeMesh = new THREE.Mesh(this.tubeGeometry, material)

        scene.add(this.tubeMesh)
    }

    moveWaves() {
        const newAmplitudeIntensity = this.calculateAverage(this.inputData)

        for (let i = 0; i < this.numPoints; i++) {
            // if (
            //   i < Math.ceil(this.numPoints / 4) ||
            //   i > Math.ceil((this.numPoints * 3) / 4)
            // ) {
            //   this.points[i].x = this.points[i].x;
            //   this.points[i].y = 0;
            //   continue;
            // }

            let newAmplitude =
                (this.amplitude * (((i * this.numPoints) / this.frequency) * 2)) / 100
            let x = (i / this.numPoints) * 4 * Math.PI
            let y =
                newAmplitudeIntensity * newAmplitude * Math.sin(this.frequency * this.points[i].x)

            this.points[i].x = x
            this.points[i].y = y
        }

        // Recompute the tube geometry with the updated points
        this.tubeGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(this.points),
            this.numPoints - 1,
            this.radius,
            8,
            false
        )
        this.tubeMesh.geometry.dispose() // Clean up the previous geometry
        this.tubeMesh.geometry = this.tubeGeometry // Assign the new geometry to the mesh
    }

    calculateAverage(array: Array<number>) {
        var total = 0

        array.forEach(function (item: number) {
            total += item
        })

        return total || 0
    }
}
