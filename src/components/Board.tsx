import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import * as React from "react";
import { useState, useRef,  Dispatch, SetStateAction } from "react";

interface BoardProps {
  elements: {
    id: string;
    type: string;
    top: number;
    left: number;
    text: string;
    fontSize: number;
    fontWeight: string;
  }[];
  onDrop: (
    elementType: string,
    top: number,
    left: number,
    text: string,
    fontSize: number,
    fontWeight: string
  ) => void;
  onMove: (id: string, top: number, left: number) => void;
  touchData: string | null;
  setTouchData: Dispatch<SetStateAction<string | null>>;
  onEditMove: (
    id: string,
    top: number,
    left: number,
    text: string,
    fontSize: number,
    fontWeight: string
  ) => void;
  onDelete: (id: string) => void;
}

const Board: React.FC<BoardProps> = ({
  elements,
  onDrop,
  onMove,
  onEditMove,
  onDelete,
}) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState<{
    type: string;
    id: string;
  } | null>(null);
  const [elementData, setElementData] = useState<{
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
  }>({ text: "", x: 0, y: 0, fontSize: 16, fontWeight: "normal" });
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const elementType = e.dataTransfer.getData("text");
    const id = e.dataTransfer.getData("id");
    const x = e.clientY - top;
    const y = e.clientX - left;

    if (id) {
      onMove(id, x, y);
    } else {
      setCurrentElement({
        type: elementType,
        id: `element-${elements.length}`,
      });
      setElementData({
        text: "",
        x,
        y,
        fontSize: 16,
        fontWeight: "normal",
      });
      setModalOpen(true);
    }

    setDraggedElement(null);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedElement(id);
    e.dataTransfer.setData("text", "existingElement");
    e.dataTransfer.setData("id", id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedElement) {
      const { top, left } = e.currentTarget.getBoundingClientRect();
      onMove(draggedElement, e.clientY - top, e.clientX - left);
    }
  };
  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    setDraggedElement(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!boardRect || !draggedElement) return;
    const top = touch.clientY - boardRect.top;
    const left = touch.clientX - boardRect.left;
    onMove(draggedElement, top, left);
  };


  const handleTouchEnd = () => {
    setDraggedElement(null);
  };

  const handleSave = () => {
    if (editingElementId) {
      // Update existing element
      onEditMove(
        editingElementId,
        elementData.x,
        elementData.y,
        elementData.text,
        elementData.fontSize,
        elementData.fontWeight
      );
      setEditingElementId(null); // Reset editingElementId
    } else if (currentElement) {
      // Create new element
      onDrop(
        currentElement.type,
        elementData.x,
        elementData.y,
        elementData.text,
        elementData.fontSize,
        elementData.fontWeight
      );
    }

    setModalOpen(false);
    setElementData({
      text: "",
      x: 0,
      y: 0,
      fontSize: 16,
      fontWeight: "normal",
    });
  };

  const renderElement = (element: {
    id: string;
    type: string;
    top: number;
    left: number;
    text: string;
    fontSize: number;
    fontWeight: string;
  }) => {
    const style = {
      fontSize: `${element.fontSize}px`,
      fontWeight: element.fontWeight,
      padding: "10px",
      border: selectedElementId === element.id ? "2px solid red" : "none",
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.ctrlKey) {
        // Open the modal for the selected element
        setSelectedElementId(element.id);
        setEditingElementId(element.id);
        setModalOpen(true);
        setElementData({
          text: element.text,
          x: element.top,
          y: element.left,
          fontSize: element.fontSize,
          fontWeight: element.fontWeight,
        });
      }
    };
    const handleClick = () => {
      setSelectedElementId(element.id);
    };

    switch (element.type) {
      case "input":
        return (
          <input
            onKeyDown={handleKeyDown}
            placeholder="Enter Value"
            onClick={handleClick}
            value={element.text}
            type="text"
            style={style}
          />
        );
      case "label":
        return (
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            style={style}
          >
            {element.text}
          </div>
        );
      case "button":
        return (
          <button onKeyDown={handleKeyDown} onClick={handleClick} style={style}>
            {element.text}
          </button>
        );
      default:
        return null;
    }
  };

  const handleDelete = () => {
    if (selectedElementId) {
      onDelete(selectedElementId);
      setSelectedElementId(null);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        handleDelete();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElementId]);

  return (
    <>
      <div
        ref={boardRef}
        className="w-full relative h-full bg-[#F3F3F3]"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className={`absolute z-50 ${
              element.type === "button" ? "bg-blue-500 rounded-md" : "bg-white"
            }`}
            style={{ top: element.top, left: element.left }}
            draggable
            onDragStart={(e) => handleDragStart(e, element.id)}
            onTouchStart={(e) => handleTouchStart(e, element.id)}
          >
            {renderElement(element)}
          </div>
        ))}
        {modalOpen && (
          <Dialog
            sx={{
              "& .MuiDialog-paper": {
                width: ["100%", "75%", "25%"],
                maxWidth: "none",
              },
            }}
            open={modalOpen}
            fullWidth
          >
            <DialogTitle
              sx={{
                m: 0,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              id="customized-dialog-title"
            >
              Edit {currentElement?.type}
              <IconButton
                aria-label="close"
                onClick={() => setModalOpen(false)}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <svg
                  width="23px"
                  height="23px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Menu / Close_MD">
                    <path
                      id="Vector"
                      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
              </IconButton>
            </DialogTitle>

            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 5,
              }}
              dividers
            >
              <TextField
                label="Text"
                fullWidth
                placeholder="This is label"
                type="text"
                value={elementData.text}
                onChange={(e) =>
                  setElementData({ ...elementData, text: e.target.value })
                }
              />
              <TextField
                label="X"
                fullWidth
                type="number"
                value={elementData.x}
                onChange={(e) =>
                  setElementData({
                    ...elementData,
                    x: parseInt(e.target.value),
                  })
                }
              />
              <TextField
                label="Y"
                fullWidth
                type="number"
                value={elementData.y}
                onChange={(e) =>
                  setElementData({
                    ...elementData,
                    y: parseInt(e.target.value),
                  })
                }
              />
              <TextField
                label="Font Size"
                fullWidth
                type="number"
                placeholder="Enter font size"
                value={elementData.fontSize}
                onChange={(e) =>
                  setElementData({
                    ...elementData,
                    fontSize: parseInt(e.target.value),
                  })
                }
              />
              <TextField
                label="Font Weight"
                fullWidth
                placeholder="Enter font weight"
                value={elementData.fontWeight}
                onChange={(e) =>
                  setElementData({
                    ...elementData,
                    fontWeight: e.target.value,
                  })
                }
              />
            </DialogContent>
              <DialogActions sx={{  display:"flex", justifyContent:"flex-start", p:2}}>
              {/* <Button
                variant="contained"
                color="error"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button> */}
              <Button variant="contained" autoFocus onClick={handleSave}>
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Board;
