const productos = [
    { id: 1, nombre: "Zapatillas Urbanas", precio: 15000, img: "https://via.placeholder.com/150" },
    { id: 2, nombre: "Remera Oversize", precio: 8000, img: "https://via.placeholder.com/150" },
    { id: 3, nombre: "Jean Slim Fit", precio: 12000, img: "https://via.placeholder.com/150" }
  ];
  
  const contenedor = document.getElementById("contenedor-productos");
  
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
  
  let carrito = [];
  
  function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    Swal.fire({
      title: '¡Agregado!',
      text: `${producto.nombre} fue agregado al carrito`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }
  