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
  const [jsonInput, setJsonInput] = useState("");

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

  const handleJsonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJsonInput(e.target.value);
  };

  const handleImport = () => {
    try {
      const parsedElements = JSON.parse(jsonInput);
      setBoardElements(parsedElements);
    } catch (error) {
      console.error("Invalid JSON input");
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div className="md:w-3/4 w-full h-full bg-slate-200">
        <Board
          elements={boardElements}
          onEditMove={handleEditMove}
          onDrop={handleDrop}
          onMove={handleMove}
          onDelete={handleDelete}
        />
      </div>
      <div className="md:w-1/4 md:h-full absolute md:relative bottom-0 w-full bg-[#2D2D2D]">
        <Sidebar onDragStart={handleDragStart} />
        <div className="md:absolute  bottom-20 md:bg-transparent bg-[#2D2D2D] right-5 gap-4 flex justify-center  flex-col">
          <div className="flex md:flex-wrap gap-4 justify-center items-center w-full">
            <input
              className="h-12 p-2 border border-gray-400 rounded-md"
              placeholder="Paste JSON to import"
              value={jsonInput}
              onChange={handleJsonInput}
            />
            <button
              className="bg-gray-400 rounded-md px-2 py-3"
              onClick={handleImport}
            >
              Import JSON
            </button>
          </div>
          <div className="flex w-full md:justify-end justify-center">
            <button
              className=" bg-gray-400 rounded-md px-2 py-3"
              onClick={handleExport}
            >
              Export JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
