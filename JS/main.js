let productos = [];
const contenedor = document.getElementById("contenedor-productos");

fetch('productos.json')
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos(productos);
  })
  .catch(error => {
    console.error('Error al cargar productos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: 'No se pudieron cargar los productos. Intenta más tarde.'
    });
  });


function mostrarProductos(productos) {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
        contenedor.appendChild(div);
    });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    guardarCarritoEnStorage();
    Swal.fire({
        title: '¡Agregado!',
        text: `${producto.nombre} fue agregado al carrito`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}


const carritoContenedor = document.getElementById("carrito-contenido");
const totalCarrito = document.getElementById("total");
const btnVerCarrito = document.getElementById("verCarrito");
const btnVaciarCarrito = document.getElementById("vaciarCarrito");
const btnFinalizarCompra = document.getElementById("finalizarCompra");
const carritoDiv = document.getElementById("carrito");

btnVerCarrito.addEventListener("click", () => {
    carritoDiv.classList.toggle("oculto");
    mostrarCarrito();
});

btnVaciarCarrito.addEventListener("click", () => {
    carrito = [];
    guardarCarritoEnStorage();
    mostrarCarrito();
});

btnFinalizarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire('Tu carrito está vacío', '', 'info');
        return;
    }

    Swal.fire({
        title: '¡Gracias por tu compra!',
        text: 'Tu pedido será procesado pronto',
        icon: 'success'
    });

    carrito = [];
    guardarCarritoEnStorage();
    mostrarCarrito();
});

function mostrarCarrito() {
    carritoContenedor.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${producto.nombre} - $${producto.precio}</p>`;
        carritoContenedor.appendChild(div);
    });

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalCarrito.textContent = total;
}

function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
