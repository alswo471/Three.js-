<template>
  <div ref="containers"></div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default {
  mounted() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.$refs.containers.appendChild(this.renderer.domElement)

    // 카메라 생성
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.set(2, 20, 40)

    // 조명 생성
    const ambientLight = new THREE.AmbientLight(0x9de4ff, 10)
    const directionalLight = new THREE.DirectionalLight(0x9de4ff, 10)
    directionalLight.position.set(0, 40, 20)

    // 씬 생성
    this.scene = new THREE.Scene()
    this.scene.add(this.camera)

    this.scene.add(ambientLight)
    this.scene.add(directionalLight)

    // GLTF 파일 로드
    // const url = 'testUI/scene.gltf'
    const url2 = 'testUI2/free_sandy_rock_hill.glb'
    const url3 = 'testUi3/shiba.glb'
    const loader = new GLTFLoader()

    // loader.load(
    //   url,
    //   (gltf) => {
    //     this.scene.add(gltf.scene)
    //     gltf.scene.position.set(1, 0, 0)
    //   },
    //   undefined,
    //   (error) => {
    //     console.error(error)
    //   }
    // ),
    loader.load(
      url2,
      (gltf2) => {
        this.scene.add(gltf2.scene)

        gltf2.scene.position.set(0, 0, 0)
      },
      undefined,
      (error) => {
        console.error(error)
      }
    ),
      loader.load(
        url3,
        (gltf3) => {
          this.scene.add(gltf3.scene)

          gltf3.scene.position.set(0, 0, 0)
        },
        undefined,
        (error) => {
          console.error(error)
        }
      )

    //  OrbitControls 생성
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 애니메이션 루프 시작
    this.animate()
    // resize 이벤트 리스너 등록
    window.addEventListener('resize', this.onWindowResize)
  },

  beforeUnmount() {
    // resize 이벤트 리스너 제거
    window.removeEventListener('resize', this.onWindowResize)
  },

  methods: {
    onWindowResize() {
      // renderer의 크기 조절
      const width = window.innerWidth
      const height = window.innerHeight
      this.renderer.setSize(width, height)
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style>
canvas {
  width: 100%;
  height: 100%;
}
</style>
