import { describe, it, expect, beforeEach } from "vitest";
import { createCart } from "./cart.js";

beforeEach(() => {
    localStorage.clear();
});

describe("Shopping cart", () => {
    it("adds products and increases quantity for duplicate products", () => {
        const cart = createCart();

        cart.add("forma-table-lamp");
        cart.add("forma-table-lamp");
        cart.add("daily-form-tote");

        expect(cart.getItems()).toHaveLength(2);
        expect(cart.getTotalQuantity()).toBe(3);

        expect(
            cart.getItems().find((item) => item.id === "forma-table-lamp")
                .quantity,
        ).toBe(2);
    });

    it("calculates the total price correctly", () => {
        const cart = createCart();

        cart.add("forma-table-lamp");
        cart.add("forma-table-lamp");
        cart.add("daily-form-tote");

        expect(cart.getTotalPrice()).toBe(24600);
    });

    it("removes a product", () => {
        const cart = createCart();

        cart.add("forma-table-lamp");
        cart.add("daily-form-tote");
        cart.remove("forma-table-lamp");

        expect(cart.getItems()).toHaveLength(1);
        expect(cart.getTotalQuantity()).toBe(1);
    });

    it("rejects invalid products", () => {
        const cart = createCart();

        expect(cart.add("unknown-product")).toBe(false);
        expect(cart.getTotalQuantity()).toBe(0);
    });

    it("updates product quantity", () => {
        const cart = createCart();

        cart.add("forma-table-lamp");

        expect(cart.updateQuantity("forma-table-lamp", 3)).toBe(true);

        expect(cart.getTotalQuantity()).toBe(3);
        expect(cart.getTotalPrice()).toBe(26700);
    });

    it("clears the cart", () => {
        const cart = createCart();

        cart.add("forma-table-lamp");
        cart.clear();

        expect(cart.getItems()).toHaveLength(0);
        expect(cart.getTotalPrice()).toBe(0);
    });

    it("persists cart items across cart instances", () => {
        const firstCart = createCart();

        firstCart.add("forma-table-lamp");
        firstCart.add("forma-table-lamp");

        const secondCart = createCart();

        expect(secondCart.getTotalQuantity()).toBe(2);
        expect(secondCart.getTotalPrice()).toBe(17800);
    });
});
