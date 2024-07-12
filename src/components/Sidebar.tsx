import React from "react";
import GripIcon from "/grip-vertical.svg"
interface SidebarProps {
  onDragStart: (e: React.DragEvent | React.TouchEvent, elementType: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  const handleTouchStart = (e: React.TouchEvent, elementType: string) => {
    onDragStart(e, elementType);
  };
  return (
    <div className="p-4 h-full bg-[#2D2D2D]">
      <div className=" my-4 text-xl text-white font-bold">BLOCKS</div>
      <div className="sidebar">
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000] "
          draggable
          onDragStart={(e) => onDragStart(e, "label")}
          onTouchStart={(e) => handleTouchStart(e, "label")}
        >
          <img src={GripIcon} alt="grip-icon"/> Label
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000] "
          draggable
          onDragStart={(e) => onDragStart(e, "input")}
          onTouchStart={(e) => handleTouchStart(e, "input")}
        >
          <img src={GripIcon} alt="grip-icon"/> Input
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000]"
          draggable
          onDragStart={(e) => onDragStart(e, "button")}
          onTouchStart={(e) => handleTouchStart(e, "button")}
        >
          <img src={GripIcon} alt="grip-icon"/> Button
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
