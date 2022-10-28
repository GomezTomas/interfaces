let juegosComprables = [
    {
        "nombre":"League Of Legends",
        "precio": "500,00$",
        "comprado": false
    },
    {
        "nombre":"Friday Night Funkin",
        "precio":"1.000,00$",
        "comprado": false
    },
    {
        "nombre":"Geometry Dash",
        "precio":"200,00$",
        "comprado": false
    },
    {
        "nombre":"Metal Slug",
        "precio":"100,00$",
        "comprado": false
    },
    {
        "nombre":"Club Manager",
        "precio":"800,00$",
        "comprado": false
    },
    {
        "nombre":"The Last Stand",
        "precio":"800,00$",
        "comprado": false
    }
]

let carrito = [];

let idClubManager = document.getElementById("precioClubManager");
idClubManager.innerHTML = juegosComprables[4].precio;

let idLol = document.getElementById("precioLol");
idLol.innerHTML = juegosComprables[0].precio;

let idMetalSlug = document.getElementById("precioMetalSlug");
idMetalSlug.innerHTML = juegosComprables[3].precio;

let idTheLastStand = document.getElementById("precioTheLastStand");
idTheLastStand.innerHTML = juegosComprables[5].precio;

let idFridayNightFunkin = document.getElementById("precioFridayNightFunkin");
idFridayNightFunkin.innerHTML = juegosComprables[1].precio;

let idGeometryDash = document.getElementById("precioGeometryDash");
idGeometryDash.innerHTML = juegosComprables[2].precio;

let btnLol = document.getElementById("btnLol").addEventListener("click", function(){
    let Lol = juegosComprables[0];
    if(Lol.comprado == false){
        Lol.comprado = true;
        comprar(Lol, idLol);
    }else if(Lol.comprado == true){
        Lol.comprado = false;
        eliminarJuegoCarrito(Lol, idLol);
    }
});
let btnFridayNightFunkin = document.getElementById("btnFridayNightFunkin").addEventListener("click", function(){
    let fridayNightFunkin = juegosComprables[1];
    if(fridayNightFunkin.comprado == false){
        fridayNightFunkin.comprado = true;
        comprar(fridayNightFunkin, idFridayNightFunkin);
    }else if(fridayNightFunkin.comprado == true){
        fridayNightFunkin.comprado = false;
        eliminarJuegoCarrito(fridayNightFunkin, idFridayNightFunkin);
    }
});
let btnGeometryDash = document.getElementById("btnGeometryDash").addEventListener("click", function(){
    let GeometryDash = juegosComprables[2];
    if(GeometryDash.comprado == false){
        GeometryDash.comprado = true;
        comprar(GeometryDash, idGeometryDash);
    }else if(GeometryDash.comprado == true){
        GeometryDash.comprado = false;
        eliminarJuegoCarrito(GeometryDash, idGeometryDash);
    }
});
let btnMetalSlug = document.getElementById("btnMetalSlug").addEventListener("click", function(){
    let metalSlug = juegosComprables[3];
    if(metalSlug.comprado == false){
        metalSlug.comprado = true;
        comprar(metalSlug, idMetalSlug);
    }else if(metalSlug.comprado == true){
        metalSlug.comprado = false;
        eliminarJuegoCarrito(metalSlug, idMetalSlug);
    }
});
let btnClubManager = document.getElementById("btnClubManager").addEventListener("click", function(){
    let clubManager = juegosComprables[4];
    if(clubManager.comprado == false){
        clubManager.comprado = true;
        comprar(clubManager, idClubManager);
    }else if(clubManager.comprado == true){
        clubManager.comprado = false;
        eliminarJuegoCarrito(clubManager, idClubManager);
    }
});
let btnTheLastStand = document.getElementById("btnTheLastStand").addEventListener("click", function(){
    let theLastStand = juegosComprables[5];
    if(theLastStand.comprado == false){
        theLastStand.comprado = true;
        comprar(theLastStand, idTheLastStand);
    }else if(theLastStand.comprado == true){
        theLastStand.comprado = false;
        eliminarJuegoCarrito(theLastStand, idTheLastStand);
    }
});

let notificationActive;

function comprar(juego, id) {
    id.innerHTML = "Agregado al carrito";
    carrito.push(juego)
    document.styleSheets[0].addRule(".hamburguer::before", "display: flex;");
    document.styleSheets[0].addRule(".miCarrito::before", "display: flex;");
    notificationActive = true;
    console.log(carrito.length);
}

function eliminarJuegoCarrito(juego, id){
    id.innerHTML = juego.precio;
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i] == juego){
            carrito.splice(i, 1);
        }
    }
    console.log(carrito.length);
    if(carrito.length === 0){
        document.styleSheets[0].addRule(".hamburguer::before", "display: none;");
        document.styleSheets[0].addRule(".miCarrito::before", "display: none;");
        notificationActive = false;
    }
}

let notificacion = document.querySelector('.hamburguer');

notificacion.addEventListener("click", function(){
    if(notificationActive == true){
        document.styleSheets[0].addRule(".hamburguer::before", "display: none;");
        notificationActive = false;
    }else if(notificationActive == false && carrito.length !== 0){
        document.styleSheets[0].addRule(".hamburguer::before", "display: flex;");
        notificationActive = true;
    }
});