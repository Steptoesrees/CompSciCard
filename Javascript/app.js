function quitPage() {
  if (confirm("Are you sure you want to leave?") === true){
    if (window.close) {
      window.close();}
    
    window.location.href = 'about:blank';}
  }

(function () {
  const win = document.getElementById('Main');
  const handle = win.querySelector('.windowtopbar');
  let offsetX = 0, offsetY = 0, dragging = false;

  handle.addEventListener('mousedown', (e) => {
    dragging = true;
    handle.style.cursor = 'grabbing';
    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  function onMove(e) {
    if (!dragging) return;
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  }

  function onUp() {
    dragging = false;
    handle.style.cursor = 'grab';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  }
})();