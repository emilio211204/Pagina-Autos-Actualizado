let productos = [];

const agregarProducto = (id, producto, precio) => {
    let indice = productos.findIndex(p => p.id == id);

    if (indice != -1) {
        productos[indice].cantidad++;
        putJSON(productos[indice]);
    } else {
        postJSON({
            id: id,
            producto: producto,
            precio: precio,
            cantidad: 1,
        });
    }

    actualizarTabla();
};

const actualizarTabla = () => {
    let containerCartProducts = document.querySelector('.container-cart-products');
    let contadorProductos = document.getElementById('contador-productos');
    let totalPagar = document.querySelector('.total-pagar');
    let total = 0;

    containerCartProducts.innerHTML = '';

    for (let item of productos) {
        let rowProduct = document.createElement('div');
        rowProduct.classList.add('row-product');

        let cartProduct = document.createElement('div');
        cartProduct.classList.add('cart-product');

        let infoCartProduct = document.createElement('div');
        infoCartProduct.classList.add('info-cart-product');

        let cantidadProductoCarrito = document.createElement('span');
        cantidadProductoCarrito.classList.add('cantidad-producto-carrito');
        cantidadProductoCarrito.textContent = item.cantidad;

        let tituloProductoCarrito = document.createElement('p');
        tituloProductoCarrito.classList.add('titulo-producto-carrito');
        tituloProductoCarrito.textContent = item.producto;

        let precioProductoCarrito = document.createElement('span');
        precioProductoCarrito.classList.add('precio-producto-carrito');
        precioProductoCarrito.textContent = item.precio;

        let iconClose = document.createElement('svg');
        iconClose.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        iconClose.setAttribute('fill', 'none');
        iconClose.setAttribute('viewBox', '0 0 24 24');
        iconClose.setAttribute('stroke-width', '1.5');
        iconClose.setAttribute('stroke', 'currentColor');
        iconClose.classList.add('icon-close');

        let path = document.createElement('path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        iconClose.appendChild(path);

        iconClose.addEventListener("click", function () {
            eliminar(item.id);
        });

        infoCartProduct.appendChild(cantidadProductoCarrito);
        infoCartProduct.appendChild(tituloProductoCarrito);
        infoCartProduct.appendChild(precioProductoCarrito);

        cartProduct.appendChild(infoCartProduct);
        cartProduct.appendChild(iconClose);

        rowProduct.appendChild(cartProduct);
        containerCartProducts.appendChild(rowProduct);

        total += item.precio * item.cantidad;
    }

    contadorProductos.textContent = productos.length;
    totalPagar.textContent = total.toFixed(2);
};

const eliminar = (id) => {
    let indice = productos.findIndex(p => p.id == id);
    if (indice != -1) {
        productos.splice(indice, 1);
        actualizarTabla();
        deleteJSON(id);
    }
};

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getJSON() {
    try {
        const response = await fetch("http://localhost:3000/productos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log("Success:", result);

        productos = result;
        actualizarTabla();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function putJSON(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteJSON(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE",
        });
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

window.onload = function () {
    getJSON();
};

document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const id = Math.random().toString(36).substr(2, 9);
        const producto = this.previousElementSibling.previousElementSibling.textContent;
        const precio = parseFloat(this.previousElementSibling.textContent.replace('$', ''));
        agregarProducto(id, producto, precio);
    });
});