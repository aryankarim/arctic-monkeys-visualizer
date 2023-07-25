import * as THREE from 'three'
import { Camera } from './camera'

const camera = new Camera()

let scene = new THREE.Scene()

const color = 0xffffff
const intensity = 0.3
const light = new THREE.PointLight(color, intensity)
light.position.set(0, 0, 2000)

const light2 = new THREE.PointLight(color, intensity)
light2.position.set(0, 20000, -2000)
scene.add(light)
scene.add(light2)

const canvas = document.querySelector('#c') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
renderer.setPixelRatio(window.devicePixelRatio)
scene.background = new THREE.Color(0x0d1718)

document.body.appendChild(renderer.domElement)

export { camera, scene, renderer }
