// Datos de productos (simulando una base de datos)
const productos = [
    {
        id: 1,
        nombre: 'Smartphone XYZ',
        descripcion: 'Último modelo con cámara de alta resolución',
        precio: 599.99,
        imagen: 'img/smartphone.svg',
        categoria: 'Electrónica'
    },
    {
        id: 2,
        nombre: 'Laptop Pro',
        descripcion: 'Potente laptop para profesionales',
        precio: 1299.99,
        imagen: 'img/laptop.svg',
        categoria: 'Electrónica'
    },
    {
        id: 3,
        nombre: 'Auriculares Inalámbricos',
        descripcion: 'Sonido de alta calidad sin cables',
        precio: 149.99,
        imagen: 'img/auriculares.svg',
        categoria: 'Electrónica'
    },
    {
        id: 4,
        nombre: 'Camiseta Premium',
        descripcion: 'Camiseta de algodón 100% de alta calidad',
        precio: 29.99,
        imagen: 'img/placeholder.svg',
        categoria: 'Ropa'
    },
    {
        id: 5,
        nombre: 'Jeans Clásicos',
        descripcion: 'Jeans duraderos y cómodos',
        precio: 49.99,
        imagen: 'img/placeholder.svg',
        categoria: 'Ropa'
    },
    {
        id: 6,
        nombre: 'Zapatillas Deportivas',
        descripcion: 'Ideales para correr y entrenar',
        precio: 89.99,
        imagen: 'img/placeholder.svg',
        categoria: 'Ropa'
    },
    {
        id: 7,
        nombre: 'Lámpara de Mesa',
        descripcion: 'Diseño moderno y luz ajustable',
        precio: 39.99,
        imagen: 'img/placeholder.svg',
        categoria: 'Hogar'
    },
    {
        id: 8,
        nombre: 'Juego de Sábanas',
        descripcion: 'Suaves y transpirables para un mejor descanso',
        precio: 59.99,
        imagen: 'img/placeholder.svg',
        categoria: 'Hogar'
    },
    {
        id: 9,
        nombre: 'Set de Cocina',
        descripcion: 'Utensilios de cocina de acero inoxidable',
        precio: 79.99,
        imagen: 'img/placeholder.svg',
        categoria: 'Hogar'
    }
];

// Carrito de compras
let carrito = [];

// Elementos del DOM
const productosContainer = document.getElementById('productos-container');
const carritoModal = document.getElementById('carrito-modal');
const carritoItems = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const cartCount = document.getElementById('cart-count');
const cartIcon = document.querySelector('.cart-icon');
const cerrarCarrito = document.querySelector('.cerrar-carrito');
const finalizarCompra = document.getElementById('finalizar-compra');
const contactoForm = document.getElementById('contacto-form');

// Cargar productos en la página
function cargarProductos() {
    productosContainer.innerHTML = '';
    
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        
        // Usar una imagen de placeholder si la imagen real no está disponible
        const imagenSrc = producto.imagen || 'img/placeholder.svg';
        
        productoElement.innerHTML = `
            <img src="${imagenSrc}" alt="${producto.nombre}">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
                <button class="btn agregar-carrito" data-id="${producto.id}">Añadir al Carrito</button>
            </div>
        `;
        
        productosContainer.appendChild(productoElement);
    });
    
    // Añadir event listeners a los botones de añadir al carrito
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}

// Añadir producto al carrito
function agregarAlCarrito(event) {
    const productoId = parseInt(event.target.getAttribute('data-id'));
    const producto = productos.find(p => p.id === productoId);
    
    // Verificar si el producto ya está en el carrito
    const itemEnCarrito = carrito.find(item => item.id === productoId);
    
    if (itemEnCarrito) {
        // Incrementar cantidad si ya está en el carrito
        itemEnCarrito.cantidad++;
    } else {
        // Añadir nuevo item al carrito
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    // Actualizar la interfaz
    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} añadido al carrito`);
}

// Actualizar la interfaz del carrito
function actualizarCarrito() {
    // Actualizar contador del carrito
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items en el modal del carrito
    carritoItems.innerHTML = '';
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const carritoItem = document.createElement('div');
            carritoItem.classList.add('carrito-item');
            
            // Usar una imagen de placeholder si la imagen real no está disponible
            const imagenSrc = item.imagen || 'img/placeholder.svg';
            
            carritoItem.innerHTML = `
                <img src="${imagenSrc}" alt="${item.nombre}">
                <div class="carrito-item-info">
                    <h3>${item.nombre}</h3>
                    <div class="carrito-item-precio">$${item.precio.toFixed(2)}</div>
                    <div class="carrito-item-cantidad">
                        <button class="cantidad-btn restar" data-id="${item.id}">-</button>
                        <span class="cantidad-valor">${item.cantidad}</span>
                        <button class="cantidad-btn sumar" data-id="${item.id}">+</button>
                        <span class="eliminar-item" data-id="${item.id}">🗑️</span>
                    </div>
                </div>
            `;
            
            carritoItems.appendChild(carritoItem);
        });
    }
    
    // Actualizar total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    carritoTotal.textContent = `$${total.toFixed(2)}`;
    
    // Añadir event listeners a los botones de cantidad
    document.querySelectorAll('.restar').forEach(btn => {
        btn.addEventListener('click', decrementarCantidad);
    });
    
    document.querySelectorAll('.sumar').forEach(btn => {
        btn.addEventListener('click', incrementarCantidad);
    });
    
    document.querySelectorAll('.eliminar-item').forEach(btn => {
        btn.addEventListener('click', eliminarItem);
    });
}

// Incrementar cantidad de un item
function incrementarCantidad(event) {
    const productoId = parseInt(event.target.getAttribute('data-id'));
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        item.cantidad++;
        actualizarCarrito();
    }
}

// Decrementar cantidad de un item
function decrementarCantidad(event) {
    const productoId = parseInt(event.target.getAttribute('data-id'));
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        item.cantidad--;
        
        if (item.cantidad <= 0) {
            // Eliminar item si la cantidad llega a 0
            carrito = carrito.filter(i => i.id !== productoId);
        }
        
        actualizarCarrito();
    }
}

// Eliminar item del carrito
function eliminarItem(event) {
    const productoId = parseInt(event.target.getAttribute('data-id'));
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Estilo para la notificación
    notificacion.style.position = 'fixed';
    notificacion.style.bottom = '20px';
    notificacion.style.right = '20px';
    notificacion.style.backgroundColor = '#4CAF50';
    notificacion.style.color = 'white';
    notificacion.style.padding = '10px 20px';
    notificacion.style.borderRadius = '5px';
    notificacion.style.zIndex = '1000';
    notificacion.style.opacity = '0';
    notificacion.style.transform = 'translateY(20px)';
    notificacion.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Mostrar la notificación con animación
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateY(0)';
    }, 10);
    
    // Ocultar y eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos
    cargarProductos();
    
    // Abrir modal del carrito
    cartIcon.addEventListener('click', () => {
        carritoModal.style.display = 'flex';
    });
    
    // Cerrar modal del carrito
    cerrarCarrito.addEventListener('click', () => {
        carritoModal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    carritoModal.addEventListener('click', (event) => {
        if (event.target === carritoModal) {
            carritoModal.style.display = 'none';
        }
    });
    
    // Finalizar compra
    finalizarCompra.addEventListener('click', () => {
        if (carrito.length === 0) {
            mostrarNotificacion('Tu carrito está vacío');
            return;
        }
        
        // Aquí iría la lógica para procesar la compra
        // Por ahora, solo mostraremos una notificación y vaciaremos el carrito
        mostrarNotificacion('¡Compra realizada con éxito!');
        carrito = [];
        actualizarCarrito();
        carritoModal.style.display = 'none';
    });
    
    // Validación del formulario de contacto
    if (contactoForm) {
        contactoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Aquí iría la lógica para enviar el formulario
            // Por ahora, solo mostraremos una notificación
            mostrarNotificacion('Mensaje enviado correctamente');
            
            // Limpiar formulario
            contactoForm.reset();
        });
    }
});