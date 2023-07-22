import * as THREE from 'three'
import '../controllers/listeners/microphone'
import { scene } from '../environment/renderer'

export class Wave {
    tubeGeometry: any
    tubeMesh: any
    numPoints = 4000
    amplitude = 0.0001
    frequency = 5
    radius = 0.05
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
        let index = -1
        for (let i = 0; i < this.numPoints; i++) {
            let section = (index * this.numPoints) / this.frequency / 100
            let newAmplitude = newAmplitudeIntensity * this.amplitude * section

            let x = (i / this.numPoints) * 4 * Math.PI
            let y = newAmplitude * Math.sin(this.frequency * this.points[i].x)

            this.points[i].x = x
            this.points[i].y = y

            if (i > this.numPoints / 2) index++
            else index--
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

        return total || 1
    }
}
