export var gameSettings = {
  playerSpeed: 200,
  squareSize: 100,
  currentP1Cell: { x: 1, y: 9, number: 1 },
  currentP2Cell: { x: 1, y: 9, number: 1 },
  laddersDirections: [
    { id: 1, width: 3, height: 4, incX: 2, incY: 3, angle: { xIncrement: 0.5547001962252291, yIncrement: -0.8320502943378437 } },
    { id: 2, width: 2, height: 4, incX: 1, incY: 3, angle: { xIncrement: 0.31622776601683794, yIncrement: -0.9486832980505138 } },
    { id: 3, width: 2, height: 3, incX: 1, incY: 2, angle: { xIncrement: 0.447213595499958, yIncrement: -0.894427190999916 } },
    { id: 4, width: 4, height: 2, incX: 3, incY: 1, angle: { xIncrement: 0.9486832980505138, yIncrement: -0.31622776601683794 } },
    { id: 5, width: 0, height: 3, incX: 0, incY: 2, angle: { xIncrement: 0, yIncrement: -1 } },
    { id: 6, width: 2, height: 2, incX: -1, incY: 1, angle: { xIncrement: -0.7071067811865475, yIncrement: -0.7071067811865475 } },
    { id: 7, width: 4, height: 2, incX: -3, incY: 1, angle: { xIncrement: -0.9486832980505138, yIncrement: -0.31622776601683794 } },
  ],
  snakesDirections: [
    { id: 1, width: 3, height: 2, incX: 1, incY: 1 },
    { id: 2, width: 3, height: 3, incX: -1, incY: 2 },
    { id: 3, width: 2, height: 4, incX: 1, incY: 3 },
    { id: 4, width: 4, height: 1, incX: 3, incY: 0 },
    { id: 5, width: 2, height: 6, incX: 0, incY: 5 },
    { id: 6, width: 4, height: 2, incX: -3, incY: 1 },
  ],
  cells: [
    { x: 100, y: 550, number: 0 },
    { x: 185, y: 550, number: 1, ladder: {}, snake: {}, used: false },
    { x: 240, y: 550, number: 2, ladder: {}, snake: {}, used: false },
    { x: 295, y: 550, number: 3, ladder: {}, snake: {}, used: false },
    { x: 350, y: 550, number: 4, ladder: {}, snake: {}, used: false },
    { x: 405, y: 550, number: 5, ladder: {}, snake: {}, used: false },
    { x: 460, y: 550, number: 6, ladder: {}, snake: {}, used: false },
    { x: 515, y: 550, number: 7, ladder: {}, snake: {}, used: false },
    { x: 570, y: 550, number: 8, ladder: {}, snake: {}, used: false },
    { x: 625, y: 550, number: 9, ladder: {}, snake: {}, used: false },
    { x: 680, y: 550, number: 10, ladder: {}, snake: {}, used: false },
    { x: 680, y: 495, number: 11, ladder: {}, snake: {}, used: false },
    { x: 625, y: 495, number: 12, ladder: {}, snake: {}, used: false },
    { x: 570, y: 495, number: 13, ladder: {}, snake: {}, used: false },
    { x: 515, y: 495, number: 14, ladder: {}, snake: {}, used: false },
    { x: 460, y: 495, number: 15, ladder: {}, snake: {}, used: false },
    { x: 405, y: 495, number: 16, ladder: {}, snake: {}, used: false },
    { x: 350, y: 495, number: 17, ladder: {}, snake: {}, used: false },
    { x: 295, y: 495, number: 18, ladder: {}, snake: {}, used: false },
    { x: 240, y: 495, number: 19, ladder: {}, snake: {}, used: false },
    { x: 185, y: 495, number: 20, ladder: {}, snake: {}, used: false },
    { x: 185, y: 440, number: 21, ladder: {}, snake: {}, used: false },
    { x: 240, y: 440, number: 22, ladder: {}, snake: {}, used: false },
    { x: 295, y: 440, number: 23, ladder: {}, snake: {}, used: false },
    { x: 350, y: 440, number: 24, ladder: {}, snake: {}, used: false },
    { x: 405, y: 440, number: 25, ladder: {}, snake: {}, used: false },
    { x: 460, y: 440, number: 26, ladder: {}, snake: {}, used: false },
    { x: 515, y: 440, number: 27, ladder: {}, snake: {}, used: false },
    { x: 570, y: 440, number: 28, ladder: {}, snake: {}, used: false },
    { x: 625, y: 440, number: 29, ladder: {}, snake: {}, used: false },
    { x: 680, y: 440, number: 30, ladder: {}, snake: {}, used: false },
    { x: 680, y: 385, number: 31, ladder: {}, snake: {}, used: false },
    { x: 625, y: 385, number: 32, ladder: {}, snake: {}, used: false },
    { x: 570, y: 385, number: 33, ladder: {}, snake: {}, used: false },
    { x: 515, y: 385, number: 34, ladder: {}, snake: {}, used: false },
    { x: 460, y: 385, number: 35, ladder: {}, snake: {}, used: false },
    { x: 405, y: 385, number: 36, ladder: {}, snake: {}, used: false },
    { x: 350, y: 385, number: 37, ladder: {}, snake: {}, used: false },
    { x: 295, y: 385, number: 38, ladder: {}, snake: {}, used: false },
    { x: 240, y: 385, number: 39, ladder: {}, snake: {}, used: false },
    { x: 185, y: 385, number: 40, ladder: {}, snake: {}, used: false },
    { x: 185, y: 330, number: 41, ladder: {}, snake: {}, used: false },
    { x: 240, y: 330, number: 42, ladder: {}, snake: {}, used: false },
    { x: 295, y: 330, number: 43, ladder: {}, snake: {}, used: false },
    { x: 350, y: 330, number: 44, ladder: {}, snake: {}, used: false },
    { x: 405, y: 330, number: 45, ladder: {}, snake: {}, used: false },
    { x: 460, y: 330, number: 46, ladder: {}, snake: {}, used: false },
    { x: 515, y: 330, number: 47, ladder: {}, snake: {}, used: false },
    { x: 570, y: 330, number: 48, ladder: {}, snake: {}, used: false },
    { x: 625, y: 330, number: 49, ladder: {}, snake: {}, used: false },
    { x: 680, y: 330, number: 50, ladder: {}, snake: {}, used: false },
    { x: 680, y: 275, number: 51, ladder: {}, snake: {}, used: false },
    { x: 625, y: 275, number: 52, ladder: {}, snake: {}, used: false },
    { x: 570, y: 275, number: 53, ladder: {}, snake: {}, used: false },
    { x: 515, y: 275, number: 54, ladder: {}, snake: {}, used: false },
    { x: 460, y: 275, number: 55, ladder: {}, snake: {}, used: false },
    { x: 405, y: 275, number: 56, ladder: {}, snake: {}, used: false },
    { x: 350, y: 275, number: 57, ladder: {}, snake: {}, used: false },
    { x: 295, y: 275, number: 58, ladder: {}, snake: {}, used: false },
    { x: 240, y: 275, number: 59, ladder: {}, snake: {}, used: false },
    { x: 185, y: 275, number: 60, ladder: {}, snake: {}, used: false },
    { x: 185, y: 220, number: 61, ladder: {}, snake: {}, used: false },
    { x: 240, y: 220, number: 62, ladder: {}, snake: {}, used: false },
    { x: 295, y: 220, number: 63, ladder: {}, snake: {}, used: false },
    { x: 350, y: 220, number: 64, ladder: {}, snake: {}, used: false },
    { x: 405, y: 220, number: 65, ladder: {}, snake: {}, used: false },
    { x: 460, y: 220, number: 66, ladder: {}, snake: {}, used: false },
    { x: 515, y: 220, number: 67, ladder: {}, snake: {}, used: false },
    { x: 570, y: 220, number: 68, ladder: {}, snake: {}, used: false },
    { x: 625, y: 220, number: 69, ladder: {}, snake: {}, used: false },
    { x: 680, y: 220, number: 70, ladder: {}, snake: {}, used: false },
    { x: 680, y: 165, number: 71, ladder: {}, snake: {}, used: false },
    { x: 625, y: 165, number: 72, ladder: {}, snake: {}, used: false },
    { x: 570, y: 165, number: 73, ladder: {}, snake: {}, used: false },
    { x: 515, y: 165, number: 74, ladder: {}, snake: {}, used: false },
    { x: 460, y: 165, number: 75, ladder: {}, snake: {}, used: false },
    { x: 405, y: 165, number: 76, ladder: {}, snake: {}, used: false },
    { x: 350, y: 165, number: 77, ladder: {}, snake: {}, used: false },
    { x: 295, y: 165, number: 78, ladder: {}, snake: {}, used: false },
    { x: 240, y: 165, number: 79, ladder: {}, snake: {}, used: false },
    { x: 185, y: 165, number: 80, ladder: {}, snake: {}, used: false },
    { x: 185, y: 110, number: 81, ladder: {}, snake: {}, used: false },
    { x: 240, y: 110, number: 82, ladder: {}, snake: {}, used: false },
    { x: 295, y: 110, number: 83, ladder: {}, snake: {}, used: false },
    { x: 350, y: 110, number: 84, ladder: {}, snake: {}, used: false },
    { x: 405, y: 110, number: 85, ladder: {}, snake: {}, used: false },
    { x: 460, y: 110, number: 86, ladder: {}, snake: {}, used: false },
    { x: 515, y: 110, number: 87, ladder: {}, snake: {}, used: false },
    { x: 570, y: 110, number: 88, ladder: {}, snake: {}, used: false },
    { x: 625, y: 110, number: 89, ladder: {}, snake: {}, used: false },
    { x: 680, y: 110, number: 90, ladder: {}, snake: {}, used: false },
    { x: 680, y: 55, number: 91, ladder: {}, snake: {}, used: false },
    { x: 625, y: 55, number: 92, ladder: {}, snake: {}, used: false },
    { x: 570, y: 55, number: 93, ladder: {}, snake: {}, used: false },
    { x: 515, y: 55, number: 94, ladder: {}, snake: {}, used: false },
    { x: 460, y: 55, number: 95, ladder: {}, snake: {}, used: false },
    { x: 405, y: 55, number: 96, ladder: {}, snake: {}, used: false },
    { x: 350, y: 55, number: 97, ladder: {}, snake: {}, used: false },
    { x: 295, y: 55, number: 98, ladder: {}, snake: {}, used: false },
    { x: 240, y: 55, number: 99, ladder: {}, snake: {}, used: false },
    { x: 185, y: 55, number: 100, ladder: {}, snake: {}, used: false },
  ],
};
