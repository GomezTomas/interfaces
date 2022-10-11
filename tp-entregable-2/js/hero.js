const hamburguer = document.querySelector('.hamburguer');
const menuHamburguer = document.querySelector('.menuHamburguer');
const userSection = document.querySelector('.userSection')
const buttonsMenuSection = document.querySelector('.buttonsMenuSection')
const shareAccount = document.querySelector('.shareAccount')

hamburguer.addEventListener("click", function(){
    menuHamburguer.classList.toggle("open");
    userSection.classList.toggle("open");
    buttonsMenuSection.classList.toggle("open");
    shareAccount.classList.toggle("open");
    hamburguer.classList.toggle("active");
});