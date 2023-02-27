const products = document.querySelector(".products__container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-add");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const barsBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar__links");
const overlay = document.querySelector(".overlay");
const comp = document.querySelector(".comp");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (list) => {
    localStorage.setItem("cart", JSON.stringify(list))
}

const renderProduct = ({ id, name, price, specs, img }) => {
    return `
    <div class="product__info">
        <img src="${img}">
        <div class="products__description">
            <h3 class="products__title">${name}</h3>
            <h3 class="products__specs">${specs.join(" - ")}</h3>
            <h4 class="products__price">$ ${Number(price).toFixed(3)}</h4>
        </div>
        <button class="btn-comprar"
            data-id='${id}'
            data-specs='${specs}'
            data-name='${name}'
            data-img='${img}'
            data-price='${price}'>Comprar</button>
    </div>`;
};

const renderDivideProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join('');
}

const renderFilterProducts = (category) => {
    const list = productsData.filter(product => product.category === category);
    products.innerHTML = list.map(renderProduct).join("")
}

const renderProducts = (index = 0, category = null) => {
    if (!category) {
        renderDivideProducts(index);
    } else {
        renderFilterProducts(category);
    }
}

const showMoreProducts = () => { // boton
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (productsController.nextProductsIndex === productsController.productsLimit) { //si esta en el ultimo index quitar el boton
        btnLoad.classList.add('hidden')
    }
}

const btnActive = (selCategory) => {
    const categories = [...categoriesList];
    categories.forEach(catBtn => {
        if (catBtn.dataset.category !== selCategory) {
            catBtn.classList.remove('active')
        } else {
            catBtn.classList.add('active')
        }
    })
}

const showMoreBtn = (selCategory) => {
    if (!selCategory) {
        btnLoad.classList.remove("hidden");
    } else {
        btnLoad.classList.add("hidden");
    }
};

const changeFilterState = (selected) => {
    btnActive(selected);
    showMoreBtn(selected);
}

const applyFilter = e => {
    if (!e.target.classList.contains('category')) return
    const clicked = e.target.dataset.category;
    changeFilterState(clicked)
    if (!clicked) {
        products.innerHTML = "";
        renderProducts()
    } else {
        renderProducts(0, clicked)
        productsController.nextProductsIndex = 1;
    }
}

const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    if (cartMenu.classList.contains('open-cart')) {
        cartMenu.classList.remove('open-cart');
        return
    }
    overlay.classList.toggle('show-overlay');
}

const toggleCart = () => {
    cartMenu.classList.toggle('open-cart');
    if (barsMenu.classList.contains('open-menu')) {
        barsMenu.classList.remove('open-menu');
        return
    }
    overlay.classList.toggle('show-overlay');
}



const closeOnClick = (e) => {
    if (!e.target.classList.contains("lin")) return;
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};


const closeOnOverlay = () => {
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');

}

const renderCartProducts = ({ id, name, price, img, quantity, specs }) => {
    return `
        <div class="cart-item">
            <img src="${img}">
            <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <p class="item-specs">${specs}</p>
                <span class="item-price">$ ${Number(price).toFixed(3)}</span>
            </div>
            <div class="item-selector">
                <span class="quantity-selector down" data-id=${id}>-</span>
                <span class="item-quantity">${quantity}</span>
                <span class="quantity-selector up" data-id=${id}>+</span>
            </div>
        </div>
    `
}

const getCartTotal = () => {
    return cart.reduce((accum, currentValue) => accum + Number(currentValue.price) * currentValue.quantity, 0)
}

const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="empty-msg">El carrito esta vacio.</p>`;
        return

    } else {
        productsCart.innerHTML = cart.map(renderCartProducts).join("");
    }
}

const showTotal = () => {
    if (!cart.length) {
        total.innerHTML = `$ ${getCartTotal().toFixed(0)}`
        return
    } else {
        total.innerHTML = `$ ${getCartTotal().toFixed(3)}`
    }
}

const existingProducts = ({ id }) => cart.some(product => product.id == id)


//devuelve el arreglo y agrega el prod al carrito
const createCartProducts = product => {
    cart = [...cart, { ...product, quantity: 1 }]
}

const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal");
    }, 1000);
};


//deshabilitar boton si no hay nada
const disableBtn = (button) => {
    if (!cart.length) {
        button.classList.add("disabled");
    } else {
        button.classList.remove("disabled");
    }
};

const checkStateCart = () => {
    saveLocalStorage(cart);
    renderCart();
    showTotal(); //actualiza el total
    cartbubbleAdd(); //actualiza el bubble
    disableBtn(buyBtn); //comprar
    disableBtn(deleteBtn); //vaciar


}

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct);
};

const addProducts = (e) => {
    if (!e.target.classList.contains("btn-comprar")) return;
    const { id, name, price, img, specs } = e.target.dataset;
    const products = { id, name, price, img, specs }
    if (existingProducts(products)) {
        addUnitToProduct(products);
        showSuccessModal("Se agrego un nuevo producto al carrito");


    } else {
        createCartProducts(products)
        showSuccessModal("El productos se agrego al carrito")
    }
    checkStateCart()
}

const cartbubbleAdd = () => {
    cartBubble.textContent = cart.reduce((a, c) => a + c.quantity, 0);
}

const resetCartsItem = () => {
    cart = [];
    checkStateCart();
}
const completeCartAction = (confirm, success) => {
    if (!cart.length) return;
    if (window.confirm(confirm)) {
        resetCartsItem();
        alert(success);
    }
}

const completeBuy = () => {
    completeCartAction("Desea confirmar su compra?", "Gracias por tu compra")

}

const deleteCart = () => {
    completeCartAction("Desea vaciar el carrito?", "El carrito se ha vaciado")
}


const handleBtnPlusEvent = id => {
    const existing = cart.find(product => product.id === id);
    addUnitToProduct(existing);
}

const removeProductsCart = ({ id }) => {
    cart = cart.filter(product => product.id !== id) //se queda con los id distintos al seleccionado
    checkStateCart()
}

const substractProductUnit = ({ id }) => {
    cart = cart.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity - 1 } : product
    );
};

const handleMinutBtnEvent = (id) => {
    const existing = cart.find(product => product.id === id);
    if (existing.quantity === 1) {
        if (window.confirm("Desea eliminar el producto del Carrito?")) {
            removeProductsCart(existing)
        }
        return;
    }
    substractProductUnit(existing)
}





//aumentar o disminuir cantidad de productos desde carts
const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        //disminuir
        handleMinutBtnEvent(e.target.dataset.id)

    } else if (e.target.classList.contains("up")) {
        //aumentar
        handleBtnPlusEvent(e.target.dataset.id)

    }
    checkStateCart(); // ejecute los cambios

}






const init = () => {
    renderProducts();
    barsBtn.addEventListener("click", toggleMenu); // click menu hamburguesa
    cartBtn.addEventListener("click", toggleCart); // click carrito
    btnLoad.addEventListener("click", showMoreProducts); //click "ver Mas"
    categories.addEventListener("click", applyFilter); // click en una categoria
    barsMenu.addEventListener("click", closeOnClick); //cerrar al hacer clic en un item del menu
    overlay.addEventListener("click", closeOnOverlay); //cierra al hacer click en el overlay
    document.addEventListener("DOMContentLoaded", renderCart); //render cart al iniciar
    document.addEventListener("DOMContentLoaded", showTotal); //agrega el total
    products.addEventListener("click", addProducts);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    cartbubbleAdd();
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    productsCart.addEventListener("click", handleQuantity);

};

init();