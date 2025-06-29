import React from "react";
import BlockPanel from "./herosection/BlockPanel";
import MainScratchEditor from "./herosection/sprites/mainScratch";

const Wholesection = () => {
  return (
    <div className="flex h-screen">
      {/* Left Panel - Block Palette */}
      <BlockPanel />
      {/* Right Panel - Main Editor */}
      <div className="flex-1 overflow-y-auto">
        <MainScratchEditor />
      </div>
    </div>
  );
};

export default Wholesection;
