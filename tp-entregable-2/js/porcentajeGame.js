let play = document.getElementById("playGame").addEventListener("click", () => {
    setTimeout(() =>{
        let loading = document.getElementById("loading");
        loading.classList.toggle("active");
    }, 1500);
    let loader = document.getElementById("loader");
    setTimeout(() =>{
        loader.classList.toggle("active");
        let porcentaje = document.getElementById("porcentaje");
        let number = 0;
        let interval = setInterval(() => {
            porcentaje.innerHTML = `${number}%`;
            number++;
            if(number > 100){
                clearInterval(interval);
                loading.classList.toggle("active");
            }
        }, 150);
    }, 2000);

})