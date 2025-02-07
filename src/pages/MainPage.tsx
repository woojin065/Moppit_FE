import ThreeDViewer from "../components/ThreeDViewer";
import { useSTLStore } from "../store/useSTLStore";

function MainPage() {
  const { setSTLFile } = useSTLStore();

  const handleButtonOneClick = () => {
    setSTLFile("http://localhost:8080/arial"); // STL 파일 URL 설정
  };

  const handleButtonTwoClick = () => {
    setSTLFile(null); // 기본 큐브로 변경
  };

  return (
    <div className='p-6 flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>3D Viewer Application</h1>
      <div className='w-full max-w-4xl'>
        <ThreeDViewer />
      </div>
      <div className='mt-6 flex gap-4 justify-center'>
        <button
          onClick={handleButtonOneClick}
          className='w-48 h-14 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition flex items-center justify-center'
        >
          Load STL
        </button>
        <button
          onClick={handleButtonTwoClick}
          className='w-48 h-14 bg-red-500 text-white text-lg rounded-lg hover:bg-red-600 transition flex items-center justify-center'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default MainPage;
