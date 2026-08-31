export const DRAG_THRESHOLD_PX = 8;

export function hasExceededDragThreshold(
  deltaX: number,
  deltaY: number,
  threshold = DRAG_THRESHOLD_PX,
): boolean {
  return Math.hypot(deltaX, deltaY) >= threshold;
}

export function createDragIntentTracker(threshold = DRAG_THRESHOLD_PX) {
  let originX = 0;
  let originY = 0;
  let dragging = false;

  return {
    start(x: number, y: number) {
      originX = x;
      originY = y;
      dragging = false;
    },
    move(x: number, y: number) {
      if (dragging) return true;
      dragging = hasExceededDragThreshold(x - originX, y - originY, threshold);
      return dragging;
    },
    isDragging() {
      return dragging;
    },
    reset() {
      originX = 0;
      originY = 0;
      dragging = false;
    },
  };
}
