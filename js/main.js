const peliculas = [
    {
        id: "Bad-boys-4",
        titulo: "Bad boys 4",
        imagen: "./img/badboys.webp",
        categoria:{
            nombre: "Accion",
            id:"Accion",
        },
        precio: 150,
        duracion: 115
    },
    {
        id: "El-ultimo-conjuro",
        titulo: "El ultimo conjuro",
        imagen: "./img/conjuro.jpg",
        categoria:{
            nombre: "Terror",
            id:"Terror",
        },
        precio: 200,
        duracion: 110
    },
    {
        id: "Deadpool-&-Wolverine",
        titulo: "Deadpool & Wolverine",
        imagen: "./img/deadpool.jpg",
        categoria:{
            nombre: "Accion",
            id:"Accion",
        },
        precio: 250,
        duracion: 127
    },
    {
        id: "Intensamente-2",
        titulo: "Intensamente 2",
        imagen: "./img/intensamente.jpeg",
        categoria:{
            nombre: "Infantiles",
            id:"Infantiles",
        },
        precio: 300,
        duracion: 96
    },
    {
        id: "Mi-Villano-Favorito",
        titulo: "Mi Villano Favorito",
        imagen: "./img/mivillanofavorito.jpg",
        categoria:{
            nombre: "Infantiles",
            id:"Infantinles",
        },
        precio: 350,
        duracion:95
    },
    {
        id: "Tornados",
        titulo: "Tornados",
        imagen: "./img/tornados.webp",
        categoria:{
            nombre: "Accion",
            id:"Accion",
        },
        precio: 400,
        duracion: 122
    },
];

const contenedorPeliculas = document.querySelector("#contenedorPeliculas");
const botonesCategorias = document.querySelectorAll(".botonTipo");
let botonesComprar = document.querySelectorAll(".peliculaComprar");
const contador = document.querySelector("#contador");

function cargarPeliculas(peliculasElegidas){

    contenedorPeliculas.innerHTML = "";

    peliculasElegidas.forEach(pelicula => {

        const div = document.createElement("div");
        div.classList.add("pelicula");
        div.innerHTML= `
        <img class="peliculaImagen" src="${pelicula.imagen}" alt="${pelicula.titulo}"">
        <div class="peliculaDetalles">
        <h3 class="peliculaTitulo">"${pelicula.titulo}"</h3>
        <p class="peliculaDuracion">${pelicula.duracion} min</p>
        <p class="peliculaPrecio">$${pelicula.precio} </p>
        <button class="peliculaComprar"id=${pelicula.id}>Comprar</button>
        </div>`;

        contenedorPeliculas.append(div);
})
actualizarAgregar();

}
cargarPeliculas(peliculas);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click",(e)=> {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "Todas") {
        const peliculasBoton = peliculas.filter(pelicula => pelicula.categoria.id === e.currentTarget.id);
        cargarPeliculas(peliculasBoton);
        } else{
            cargarPeliculas(peliculas); 
        }
    })
})

function actualizarAgregar() {
    botonesComprar = document.querySelectorAll(".peliculaComprar");

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", agregarAlResumen);
    });
}

let peliculasResumen;

const peliculasResumenLS = JSON.parse(localStorage.getItem("peliculas-en-resumen"));

if(peliculasResumenLS) {
    peliculasResumen = (peliculasResumenLS);
    actualizarContador();
} else {
    peliculasResumen = [];
}


function agregarAlResumen(e){
    const idBoton = e.currentTarget.id;
    const peliculaComprada = peliculas.find(pelicula => pelicula.id === idBoton);

    if(peliculasResumen.some(pelicula => pelicula.id === idBoton)){
    const index = peliculasResumen.findIndex(pelicula => pelicula.id === idBoton);
    peliculasResumen[index].cantidad++;

    } else {
    peliculaComprada.cantidad =1 ;
    peliculasResumen.push(peliculaComprada);
    }

    actualizarContador();

    localStorage.setItem("peliculas-en-resumen", JSON.stringify(peliculasResumen));
}


function actualizarContador(){
        let nuevoContador = peliculasResumen.reduce((acc, pelicula) => acc + pelicula.cantidad, 0);
        contador.innerText = nuevoContador;
}


