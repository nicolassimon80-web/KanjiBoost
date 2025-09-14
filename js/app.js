document.getElementById('flipBtn').addEventListener('click', () => {
  document.getElementById('flashcard').classList.toggle('flip');
});
document.getElementById('clearCanvas').addEventListener('click', () => {
  const canvas = document.getElementById('drawCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
