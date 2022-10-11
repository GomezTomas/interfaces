let slider = document.querySelectorAll(".slider");
let pressed = false;
let startx, x;

for (const element of slider) {
  
  element.addEventListener('mousedown', (e)=> {
    pressed = true;
    startx = e.offsetX - element.firstElementChild.offsetLeft;
  });
  
  window.addEventListener('mouseup', ()=>{
    pressed = false;
  })

  element.addEventListener('mousemove', (e) => {
    if(!pressed) return;
    e.preventDefault();
    x = e.offsetX;
  
    element.firstElementChild.style.left = `${x - startx}px`;
    checkBoundary();
  });

  function checkBoundary(){
    if(parseInt(element.firstElementChild.style.left) > 0){
      element.firstElementChild.style.left = '0px';
    }
  }

}

