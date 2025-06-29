import React, { useState } from "react";
import SpriteManager from "./SpriteManager.jsx";
import StagePanel from "./herosection/stage/StagePanel";
import ControlPanel from "./herosection/control/ControlPanel";


const MainScratch = () => {
  const [sprites, setSprites] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSpriteIds, setSelectedSpriteIds] = useState([]);
  const [currentExecutingSprite, setCurrentExecutingSprite] = useState(null);
  const [executionStep, setExecutionStep] = useState(null);

  // Add new sprite
  const handleAddSprite = () => {
    const newSprite = {
      id: Date.now(),
      name: `Sprite ${sprites.length + 1}`,
      x: 100 + sprites.length * 60,
      y: 100,
      rotation: 0,
      color: "bg-blue-500",
      blocks: [],
      isRunning: false,
      message: ""
    };
    setSprites((prev) => [...prev, newSprite]);
  };

  // Delete sprite by ID
  const handleDeleteSprite = (spriteId) => {
    setSprites((prev) => prev.filter((sprite) => sprite.id !== spriteId));
  };

  // Update single sprite data (position, rotation, blocks, etc.)
  const handleUpdateSprite = (id, updates) => {
    setSprites((prev) =>
      prev.map((sprite) =>
        sprite.id === id ? { ...sprite, ...updates } : sprite
      )
    );
  };

  // Select single sprite
  const handleSelectSprite = (id) => {
    setSelectedSpriteIds([id]);
  };

  // Select multiple sprites
  const handleMultiSpriteSelect = (ids) => {
    setSelectedSpriteIds(ids);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedSpriteIds([]);
  };

  // Start animation
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Stop animation
  const handleStop = () => {
    setIsPlaying(false);
    setCurrentExecutingSprite(null);
    setExecutionStep(null);
    // Optionally mark all sprites as not running
    setSprites((prev) =>
      prev.map((sprite) => ({ ...sprite, isRunning: false }))
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top stage area */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left panel for sprite stage */}
        <div className="w-1/2 border-r border-gray-300 relative bg-white">
          <StagePanel
            sprites={sprites}
            selectedSpriteId={selectedSpriteIds[0]}
            onSpriteSelect={handleSelectSprite}
            isPlaying={isPlaying}
            currentExecutingSprite={currentExecutingSprite}
            executionStep={executionStep}
          />
        </div>

        {/* Right panel for block editor */}
        <div className="w-1/2 overflow-auto p-4">
          <WholeSection
            sprites={sprites}
            setSprites={setSprites}
            selectedSpriteIds={selectedSpriteIds}
          />
        </div>
      </div>

      {/* Control panel at bottom */}
      <div className="border-t border-gray-300 p-3 bg-white">
        <ControlPanel
          sprites={sprites}
          selectedSpriteIds={selectedSpriteIds}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onStop={handleStop}
          onAddSprite={handleAddSprite}
          onSpriteSelect={handleSelectSprite}
          onDeleteSprite={handleDeleteSprite}
          onMultiSpriteSelect={handleMultiSpriteSelect}
          onClearSelection={handleClearSelection}
          onUpdateSprite={handleUpdateSprite}
        />
      </div>
    </div>
  );
};

export default MainScratch;
