
document.addEventListener("DOMContentLoaded", () => {
  const flashcard = document.getElementById("flashcard");
  const flipBtn = document.getElementById("flipBtn");
  const canvas = document.getElementById("canvas");
  const clearCanvas = document.getElementById("clearCanvas");

  flipBtn.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
  });

  // Canvas drawing
  const ctx = canvas.getContext("2d");
  let drawing = false;

  canvas.addEventListener("mousedown", () => drawing = true);
  canvas.addEventListener("mouseup", () => drawing = false);
  canvas.addEventListener("mousemove", draw);

  function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  });
});
