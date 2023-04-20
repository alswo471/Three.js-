<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".glb" />
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  data() {
    return {
      gltf: null,
      renderer: null,
      camera: null,
      scene: null
    }
  },
  mounted() {
    this.initThree()
  },
  methods: {
    initThree() {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas })
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.z = 5

      this.scene = new THREE.Scene()
      this.scene.add(this.camera)
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        const data = '/testUI/scene.gltf'
        this.loadGLB(data)
      }

      reader.readAsArrayBuffer(file)
    },
    loadGLB(data) {
      const loader = new GLTFLoader()

      loader.load(
        data,
        (gltf) => {
          this.scene.add(gltf.scene)
          gltf.scene.position.set(1, 0, 0)
          this.gltf = gltf
          this.animate()
        },
        (xhr) => {
          // Progress callback
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.error('Failed to load GLB', error)
        }
      )
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
