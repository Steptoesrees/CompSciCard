var img = document.getElementById("windowsOrb")

img.addEventListener("mouseenter", function(){
    img.src = "imgs/windows_7_start_menu_orb_hover.png"
});

img.addEventListener("mouseleave", function(){
    img.src = "imgs/windows_7_start_menu_orb.png"
});

img.addEventListener("click", function(){
    img.src = "imgs/windows_7_start_menu_orb_pressed.png"
});

  