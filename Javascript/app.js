function quitPage(id) {
    var win = document.getElementById(id);
    win.remove();
  }


async function getLight(){
  const date = new Date();
  const hour = date.getHours();
  const nightImage = "CSS/FrutigerNBG.webp";
  const dayImage = "CSS/frutigerBG.jpg";
  if (hour <= 7 || hour >= 17) {
    document.body.style.backgroundImage = `url('${nightImage}')`;
  } else {
    document.body.style.backgroundImage = `url('${dayImage}')`;
  }
}


(function () {
  const names = ["Main", "UserA", "UserB", "UserC", "UserD", "UserE", "UserF"];
  names.forEach((name) => {
    const win = document.getElementById(name);
    
    if (!win) return;
    const handle = win.querySelector('.windowtopbar');
    if (!handle) {
      return;
    }
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




