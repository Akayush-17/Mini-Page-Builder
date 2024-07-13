import React, {useState} from "react";
import GripIcon from "/grip-vertical.svg"
interface SidebarProps {
  onDragStart: (e: React.DragEvent | React.TouchEvent, elementType: string) => void;
  
}

const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  const [touchDragData, setTouchDragData] = useState<string | null>(null);

  const handleTouchStart = (e: React.TouchEvent, elementType: string) => {
    setTouchDragData(elementType);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
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
    <div className="p-4 h-full bg-[#2D2D2D]">
      <div className=" my-4 text-xl text-white font-bold">BLOCKS</div>
      <div className="sidebar">
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000] "
          draggable
          onDragStart={(e) => onDragStart(e, "label")}
          onTouchStart={(e) => handleTouchStart(e, "label")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={GripIcon} alt="grip-icon"/> Label
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000] "
          draggable
          onDragStart={(e) => onDragStart(e, "input")}
          onTouchStart={(e) => handleTouchStart(e, "input")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={GripIcon} alt="grip-icon"/> Input
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm flex items-center gap-2 text-base font-light text-[#000]"
          draggable
          onDragStart={(e) => onDragStart(e, "button")}
          onTouchStart={(e) => handleTouchStart(e, "button")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={GripIcon} alt="grip-icon"/> Button
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
