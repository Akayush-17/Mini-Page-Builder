import React, { useState } from "react";
import GripIcon from "/grip-vertical.svg";
interface SidebarProps {
  onElementCreate: (
    elementType: string,
    top: number,
    left: number,
    text: string,
    fontSize: number,
    fontWeight: string
  ) => void;
  onDragStart: (
    e: React.DragEvent | React.TouchEvent,
    elementType: string
  ) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onElementCreate, onDragStart }) => {
  const [touchDragData, setTouchDragData] = useState<string | null>(null);

  const createNewElement = (elementType: string) => {
    if (elementType === "label") {
      onElementCreate(elementType, 200, 200, "Label", 16, "normal");
    } else if (elementType === "input") {
      onElementCreate(elementType, 250, 200, "Input", 16, "normal");
    } else if (elementType === "button") {
      onElementCreate(elementType, 300, 200, "Button", 16, "normal");
    }
  };

  const handleTouchStart = (elementType: string) => {
    setTouchDragData(elementType);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const elementUnderTouch = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    if (elementUnderTouch) {
      elementUnderTouch.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          clientX: touch.clientX,
          clientY: touch.clientY,
        })
      );
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const dropElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (dropElement && touchDragData) {
      dropElement.dispatchEvent(
        new DragEvent("drop", {
          bubbles: true,
          clientX: touch.clientX,
          clientY: touch.clientY,
          dataTransfer: new DataTransfer(),
        })
      );
      setTouchDragData(null);
    }
  };

  return (
    <div className="p-4 h-full bg-[#2D2D2D] z-10">
      <div className=" my-4 text-xl text-white font-bold">BLOCKS</div>
      <div className="sidebar md:hidden">
        <button
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000] w-full "
          onClick={() => createNewElement("label")}
        >
          <img src={GripIcon} alt="grip-icon" /> Label
        </button>
        <button
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000]  w-full "
          onClick={() => createNewElement("input")}
        >
          <img src={GripIcon} alt="grip-icon" /> Input
        </button>
        <button
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000]  w-full "
          onClick={() => createNewElement("button")}
        >
          <img src={GripIcon} alt="grip-icon" /> Button
        </button>
      </div>
      <div className="sidebar md:block hidden">
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000] "
          draggable
          onDragStart={(e) => onDragStart(e, "label")}
          onTouchStart={() => handleTouchStart("label")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={GripIcon} alt="grip-icon" /> Label
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000] "
          draggable
          onDragStart={(e) => onDragStart(e, "input")}
          onTouchStart={() => handleTouchStart("input")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={GripIcon} alt="grip-icon" /> Input
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000]"
          draggable
          onDragStart={(e) => onDragStart(e, "button")}
          onTouchStart={() => handleTouchStart("button")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={GripIcon} alt="grip-icon" /> Button
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
