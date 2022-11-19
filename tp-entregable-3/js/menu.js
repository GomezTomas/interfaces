const hamburguer = document.querySelector('.hamburguer');
const notification = document.querySelector('.notification');
const menuHamburguer = document.querySelector('.menuHamburguer');

hamburguer.addEventListener("click", function(){
    hamburguer.classList.toggle("active");
    menuHamburguer.classList.toggle("open");   
});
