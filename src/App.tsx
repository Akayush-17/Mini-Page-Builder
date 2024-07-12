import { useEffect, useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

function App() {
  const storedElements = localStorage.getItem("boardElements");
  const initialBoardElements: {
    id: string;
    type: string;
    top: number;
    left: number;
    text: string;
    fontSize: number;
    fontWeight: string;
  }[] = storedElements ? JSON.parse(storedElements) : [];

  const [boardElements, setBoardElements] = useState(initialBoardElements);
  

  useEffect(() => {
    localStorage.setItem("boardElements", JSON.stringify(boardElements));
  }, [boardElements]);

  const handleDrop = (
    elementType: string,
    top: number,
    left: number,
    text: string,
    fontSize: number,
    fontWeight: string
  ) => {
    const newElement = {
      id: `element-${boardElements.length}`,
      type: elementType,
      top,
      left,
      text,
      fontSize,
      fontWeight,
    };
    setBoardElements((prevElements) => [...prevElements, newElement]);
  };

  const handleMove = (id: string, top: number, left: number) => {
    setBoardElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, top, left } : element
      )
    );
  };

  const handleEditMove = (
    id: string,
    top: number,
    left: number,
    text: string,
    fontSize: number,
    fontWeight: string
  ) => {
    setBoardElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id
          ? { ...element, top, left, text, fontSize, fontWeight }
          : element
      )
    );
  };

  const handleDelete = (id: string) => {
    setBoardElements((prevElements) =>
      prevElements.filter((element) => element.id !== id)
    );
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text", id);
  };

  const handleExport = () => {
    const jsonContent = JSON.stringify(boardElements, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "board-elements.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-3/4 h-full bg-slate-200">
        <Board
          elements={boardElements}
          onEditMove={handleEditMove}
          onDrop={handleDrop}
          onMove={handleMove}
          onDelete={handleDelete} 
        />
      </div>
      <div className="w-1/4 h-full">
        <Sidebar onDragStart={handleDragStart} />
        <button className="absolute bottom-5 right-10 bg-gray-400 rounded-md px-2 py-3" onClick={handleExport}>Export to JSON</button>
      </div>
    </div>
  );
}

export default App;
