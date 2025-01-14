import ThreeDViewer from "../components/3DViewer";

function MainPage() {
  const handleButtonOneClick = () => {
    console.log("Button 1 clicked");
  };

  const handleButtonTwoClick = () => {
    console.log("Button 2 clicked");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">3D Viewer Application</h1>
      <div className="w-full max-w-4xl">
        <ThreeDViewer />
      </div>
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={handleButtonOneClick}
          className="w-48 h-14 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
        >
          Button 1
        </button>
        <button
          onClick={handleButtonTwoClick}
          className="w-48 h-14 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition flex items-center justify-center"
        >
          Button 2
        </button>
      </div>
    </div>
  );
}

export default MainPage;
