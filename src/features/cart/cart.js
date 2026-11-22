import { getProductById } from "../../data/products.js";
import { loadCart, saveCart } from "../../core/storage/local-storage.js";

export function createCart() {
    let items = loadCart().filter((item) => getProductById(item.productId));

    function persist() {
        saveCart(items);
    }

    function add(productId) {
        const product = getProductById(productId);

        if (!product) {
            return false;
        }

        const existingItem = items.find((item) => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            items.push({
                productId,
                quantity: 1,
            });
        }

        persist();
        return true;
    }

    function remove(productId) {
        items = items.filter((item) => item.productId !== productId);

        persist();
    }

    function updateQuantity(productId, quantity) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            return false;
        }

        const item = items.find((item) => item.productId === productId);

        if (!item) {
            return false;
        }

        item.quantity = quantity;
        persist();

        return true;
    }

    function getItems() {
        return items.map((item) => {
            const product = getProductById(item.productId);

            return {
                ...product,
                quantity: item.quantity,
                subtotalCents: product.priceCents * item.quantity,
            };
        });
    }

    function getTotalQuantity() {
        return items.reduce((total, item) => total + item.quantity, 0);
    }

    function getTotalPrice() {
        return getItems().reduce(
            (total, item) => total + item.subtotalCents,
            0,
        );
    }

    function clear() {
        items = [];
        persist();
    }

    return {
        add,
        remove,
        updateQuantity,
        getItems,
        getTotalQuantity,
        getTotalPrice,
        clear,
    };
}
