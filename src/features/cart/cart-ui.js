export function createCartUI(cart) {
    const dialog = document.querySelector("#cart-dialog");
    const cartItems = document.querySelector(".cart-items");
    const cartCount = document.querySelector(".cart-count");
    const cartEmpty = document.querySelector(".cart-empty");
    const cartTotalPrice = document.querySelector(".cart-total-price");
    const closeButton = document.querySelector(".cart-close");

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    function formatPrice(cents) {
        return currencyFormatter.format(cents / 100);
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }

    function createCartItem(item) {
        const article = createElement("article", "cart-item");

        const image = createElement("img", "cart-item-image");
        image.src = item.image;
        image.alt = item.alt;

        const details = createElement("div", "cart-item-details");

        const name = createElement("h3", "cart-item-name", item.name);
        const price = createElement(
            "p",
            "cart-item-price",
            formatPrice(item.priceCents),
        );

        const controls = createElement("div", "cart-item-controls");

        const decreaseButton = createElement("button", "quantity-button", "−");
        decreaseButton.type = "button";
        decreaseButton.dataset.action = "decrease";
        decreaseButton.dataset.productId = item.id;
        decreaseButton.disabled = item.quantity === 1;
        decreaseButton.setAttribute(
            "aria-label",
            `Decrease ${item.name} quantity`,
        );

        const quantity = createElement(
            "span",
            "cart-item-quantity",
            String(item.quantity),
        );

        const increaseButton = createElement("button", "quantity-button", "+");
        increaseButton.type = "button";
        increaseButton.dataset.action = "increase";
        increaseButton.dataset.productId = item.id;
        increaseButton.setAttribute(
            "aria-label",
            `Increase ${item.name} quantity`,
        );

        const removeButton = createElement(
            "button",
            "cart-remove-button",
            "Remove",
        );
        removeButton.type = "button";
        removeButton.dataset.action = "remove";
        removeButton.dataset.productId = item.id;

        const subtotal = createElement(
            "p",
            "cart-item-subtotal",
            formatPrice(item.subtotalCents),
        );

        controls.append(decreaseButton, quantity, increaseButton, removeButton);

        details.append(name, price, controls);
        article.append(image, details, subtotal);

        return article;
    }

    function render() {
        const items = cart.getItems();

        cartItems.replaceChildren(...items.map(createCartItem));

        cartCount.textContent = String(cart.getTotalQuantity());
        cartTotalPrice.textContent = formatPrice(cart.getTotalPrice());

        cartEmpty.hidden = items.length > 0;
        cartItems.hidden = items.length === 0;
    }

    function open() {
        if (!dialog.open) {
            dialog.showModal();
        }
    }

    function close() {
        if (dialog.open) {
            dialog.close();
        }
    }

    closeButton.addEventListener("click", close);

    cartItems.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const { action, productId } = button.dataset;
        const item = cart
            .getItems()
            .find((cartItem) => cartItem.id === productId);

        if (!item) {
            return;
        }

        if (action === "increase") {
            cart.updateQuantity(productId, item.quantity + 1);
        } else if (action === "decrease" && item.quantity > 1) {
            cart.updateQuantity(productId, item.quantity - 1);
        } else if (action === "remove") {
            cart.remove(productId);
        }

        render();
    });

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            close();
        }
    });

    render();

    return {
        render,
        open,
        close,
    };
}
