function quitPage() {
  if (confirm("Are you sure you want to leave?") === true){
    if (window.close) {
      window.close();}
    
    window.location.href = 'about:blank';}
  }