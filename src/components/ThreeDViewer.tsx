import { useRef, useEffect } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSTLStore } from "../store/useSTLStore";

const ThreeDViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { stlFile } = useSTLStore(); // Zustand에서 상태 가져오기

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene 설정
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // STL 모델 로드
    const loader = new STLLoader();
    let mesh: THREE.Mesh | null = null;

    if (stlFile) {
      loader.load(stlFile, (geometry: THREE.BufferGeometry) => {
        const material = new THREE.MeshStandardMaterial({ color: 0x555555 });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });
    } else {
      // STL이 없을 때 기본 큐브 표시
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    }

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup (언마운트 시 메모리 정리)
    return () => {
      if (mesh) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
    };
  }, [stlFile]); // stlFile이 변경될 때마다 실행됨

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
};

export default ThreeDViewer;
