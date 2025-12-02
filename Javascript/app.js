function quitPage(id) {
    var win = document.getElementById(id);
    win.remove();
  }

(function () {
  const names = ["Main", "Tomi", "Jack", "Laura", "Rohan", "Rebbeca", "Abdullah"];
  names.forEach((name) => {
    const win = document.getElementById(name);
    if (!win) return;
    const handle = win.querySelector('.windowtopbar');
    if (!handle) return;
    let offsetX = 0, offsetY = 0, dragging = false;

    const onMove = (e) => {
      if (!dragging) return;
      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${e.clientY - offsetY}px`;
    };

    const onUp = () => {
      dragging = false;
      handle.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    handle.addEventListener('mousedown', (e) => {
      dragging = true;
      handle.style.cursor = 'grabbing';
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  });
})();
