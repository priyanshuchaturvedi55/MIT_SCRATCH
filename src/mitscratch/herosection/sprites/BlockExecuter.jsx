// Enhanced block execution logic with animation and speech support

export class BlockExecutor {
  constructor(updateSpritePosition, updateSpriteRotation, showSpriteMessage, checkCollisions) {
    this.updateSpritePosition = updateSpritePosition;
    this.updateSpriteRotation = updateSpriteRotation;
    this.showSpriteMessage = showSpriteMessage;
    this.checkCollisions = checkCollisions;
    this.animationSpeed = 1; // Speed multiplier (1x default)
  }

  // Allow dynamic speed adjustment
  setSpeed(speed) {
    this.animationSpeed = Math.max(0.1, Math.min(5, speed)); // Clamp between 0.1 and 5
  }

  // Execute all blocks for a given sprite
  async executeBlocks(sprite) {
    if (!sprite.blocks || sprite.blocks.length === 0) return;

    for (const block of sprite.blocks) {
      await this.executeBlock(sprite, block);
    }
  }

  // Execute a single block based on type
  async executeBlock(sprite, block) {
    switch (block.type) {
      case "move":
        await this.animateMovement(sprite, block.value || 10);
        break;

      case "turn":
        const degrees = block.value || 15;
        const newRotation = (sprite.rotation + degrees) % 360;
        this.updateSpriteRotation(sprite.id, newRotation);
        await this.wait(200);
        break;

      case "goto":
        const x = block.x ?? 0;
        const y = block.y ?? 0;
        this.updateSpritePosition(sprite.id, x, y);
        await this.wait(300);
        break;

      case "say":
        const message = block.message || "Hello!";
        const duration = block.duration || 2;
        await this.showMessage(sprite, message, duration);
        break;

      case "wait":
        const waitTime = (block.duration || 1) * 1000;
        await this.wait(waitTime);
        break;

      case "repeat":
        await this.executeRepeat(sprite, block);
        break;

      default:
        // Unknown block type
        break;
    }
  }

  // Animate smooth movement
  async animateMovement(sprite, steps) {
    const stepSize = 3;
    const totalDistance = steps * stepSize;
    const frames = 20;
    const frameDelay = (Math.max(300, steps * 30) / frames) / this.animationSpeed;
    const distancePerFrame = totalDistance / frames;

    const radians = (sprite.rotation * Math.PI) / 180;
    const deltaX = Math.cos(radians) * distancePerFrame;
    const deltaY = Math.sin(radians) * distancePerFrame;

    let currentFrame = 0;

    return new Promise((resolve) => {
      const animate = () => {
        if (currentFrame < frames) {
          const newX = sprite.x + deltaX;
          const newY = sprite.y + deltaY;
          this.updateSpritePosition(sprite.id, newX, newY);
          currentFrame++;
          setTimeout(animate, frameDelay);
        } else {
          resolve();
        }
      };
      animate();
    });
  }

  // Show speech message for a duration
  async showMessage(sprite, message, duration) {
    this.showSpriteMessage(sprite.id, message);
    await this.wait(duration * 1000);
    this.showSpriteMessage(sprite.id, ""); // Clear after timeout
  }

  // Handle repeat blocks
  async executeRepeat(sprite, block) {
    const times = block.times || 3;
    const children = block.children || [];

    for (let i = 0; i < times; i++) {
      for (const childBlock of children) {
        await this.executeBlock(sprite, childBlock);
      }
    }
  }

  // Helper delay
  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms / this.animationSpeed));
  }
}
