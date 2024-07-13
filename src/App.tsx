import { useEffect, useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

function App() {
  const [touchData, setTouchData] = useState<string | null>(null);
  const [ClickInstruction, setClickInstruction] = useState(true);
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

  const handleInstruction = () => {
    setClickInstruction(!ClickInstruction);
  };
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

  const handleDragStart = (
    e: React.DragEvent | React.TouchEvent,
    id: string
  ) => {
    if ("dataTransfer" in e) {
      e.dataTransfer.setData("text", id);
    } else {
      setTouchData(id);
    }
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
  const handleElementCreate = (
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

  return (
    <div className="h-screen w-screen overflow-hidden flex md:flex-row flex-col bg-slate-200">
      <div className="md:w-3/4 w-full md:h-full  bg-slate-200 ">
        <Board
          elements={boardElements}
          onEditMove={handleEditMove}
          onDrop={handleDrop}
          onMove={handleMove}
          onDelete={handleDelete}
          touchData={touchData}
          setTouchData={setTouchData}
        />
      </div>
      {ClickInstruction ? null : <div className="z-50" onClick={handleInstruction}>
        <svg
          width="25px"
          height="25px"
          viewBox="-0.5 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      }
      
      {ClickInstruction ? (
        <div className="z-50">
          <div
            className="bg-purple-200 max-w-fit relative
         h-full p-2"
          >
            <div
              onClick={handleInstruction}
              className="absolute top-1 right-1 hover:bg-slate-500 rounded-full"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
                  fill="#080341"
                />
              </svg>
            </div>
            <h2 className="font-bold text-red-500">**Instruction</h2>
            <ul className="flex flex-col whitespace-nowrap text-sm ">
              <li>
                <span className="font-bold"> Click</span> on element to add to
                Board
              </li>
              <li>
                <span className="font-bold"> Click</span> on element to open
                edit modal
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      <div className="md:w-1/4 w-full md:h-full absolute md:relative bottom-0 bg-[#2D2D2D] pb-2">
        <Sidebar
          onDragStart={handleDragStart}
          onElementCreate={handleElementCreate}
        />
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
