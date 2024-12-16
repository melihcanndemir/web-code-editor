import React from "react";
import CodeLearningPlatform from "./components/CodeLearningPlatform";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold p-4">Code Editor</h1>
      <div className="container mx-auto px-4">
        <CodeLearningPlatform />
      </div>
    </div>
  );
}

export default App;
