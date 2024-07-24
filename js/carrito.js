const peliculasResumen = JSON.parse(localStorage.getItem("peliculas-en-resumen"));

const contenedorResumenVacio = document.querySelector("#resumenVacio");
const contenedorResumenBoletos = document.querySelector("#resumenBoletos");
const contenedorResumenOpciones = document.querySelector("#resumenOpciones");
const contenedorResumenComprado = document.querySelector("#resumenComprado");
let botonesEliminar = document.querySelectorAll (".resumenProductoElimnar");
const botonVaciar = document.querySelector("#botonVaciar");
const contenedorTotal = document.querySelector ("#total");
const botonComprar = document.querySelector ("#botonComprar");

function cargarPeliculasResumen() {

if (peliculasResumen && peliculasResumen.length >0){

contenedorResumenVacio.classList.add("disabled");
contenedorResumenBoletos.classList.remove("disabled");
contenedorResumenOpciones.classList.remove("disabled");
contenedorResumenComprado.classList.add("disabled");

contenedorResumenBoletos.innerHTML = "";

peliculasResumen.forEach(pelicula => {

    const div = document.createElement ("div");
    div.classList.add("resumenBoleto");
    div.innerHTML = `
    <img class="resumenProductoImagen" src="${pelicula.imagen}" alt="${pelicula.titulo}">
                    <div class="resumenPeliculaTitulo">
                        <small>Titulo</small>
                        <h3>${pelicula.titulo}</h3>
                    </div>
                    <div class="resumenPeliculaCantidad">
                    <small>Cantidad</small>
                    <p>${pelicula.cantidad}</p>
                    </div>
                    <div class="resumenProductoPrecio">
                        <small>Precio</small>
                        <p>$${pelicula.precio}</p>
                    </div>
                    <div class="resuemProductoSubtotal">
                        <small>Subtotal</small>
                        <p>$${pelicula.precio * pelicula.cantidad}</p>
                    </div>
                    <button class="resumenProductoEliminar" id="${pelicula.id}"><i class="bi bi-trash-fill"></i></button>
    `;

    contenedorResumenBoletos.append(div);


    })

}else {
    contenedorResumenVacio.classList.remove("disabled");
    contenedorResumenBoletos.classList.add("disabled");
    contenedorResumenOpciones.classList.add("disabled");
    contenedorResumenComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarPeliculasResumen();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".resumenProductoEliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelResumen);
    });
}

function eliminarDelResumen (e){
    const idBoton = e.currentTarget.id;
    const index = peliculasResumen.findIndex(producto => producto.id === idBoton);
    peliculasResumen.splice(index,1);

    cargarPeliculasResumen();

    localStorage.setItem("peliculas-en-resumen",JSON.stringify(peliculasResumen));

}

botonVaciar.addEventListener("click",vaciarResumen);
console.log(botonVaciar);
function vaciarResumen(){

    peliculasResumen.length = 0; 
    localStorage.setItem("peliculas-en-resumen", JSON.stringify(peliculasResumen));
    cargarPeliculasResumen();
}

function actualizarTotal(){
    const totalCalculado = peliculasResumen.reduce ((acc, pelicula) => acc + (pelicula.precio * pelicula.cantidad),0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click",comprarResumen);
console.log(botonComprar);
function comprarResumen(){

    peliculasResumen.length = 0; 
    localStorage.setItem("peliculas-en-resumen", JSON.stringify(peliculasResumen));
    contenedorResumenVacio.classList.add("disabled");
    contenedorResumenBoletos.classList.add("disabled");
    contenedorResumenOpciones.classList.add("disabled");
    contenedorResumenComprado.classList.remove("disabled");
}