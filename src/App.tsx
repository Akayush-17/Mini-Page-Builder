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

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text", id);
  };

  return (
    <div className="h-screen w-full flex">
      
    </div>
  );
}

export default App;
