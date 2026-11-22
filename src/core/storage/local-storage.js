const CART_STORAGE_KEY = "modernshop-cart";

export function saveCart(items) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

        return true;
    } catch (error) {
        console.error("Could not save cart:", error);
        return false;
    }
}

export function loadCart() {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (!storedCart) {
            return [];
        }

        const parsedCart = JSON.parse(storedCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart.filter(
            (item) =>
                item &&
                typeof item.productId === "string" &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0,
        );
    } catch (error) {
        console.error("Could not load cart:", error);
        return [];
    }
}

export function clearStoredCart() {
    try {
        localStorage.removeItem(CART_STORAGE_KEY);
        return true;
    } catch (error) {
        console.error("Could not clear cart:", error);
        return false;
    }
}
