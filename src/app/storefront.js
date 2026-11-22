import "../styles/main.css";
import { createCart } from "../features/cart/cart.js";
import { createCartUI } from "../features/cart/cart-ui.js";

document.documentElement.dataset.app = "storefront";

// Shopping cart
const cart = createCart();
const cartUI = createCartUI(cart);

const cartButton = document.querySelector(".cart-link");
const cartFeedback = document.querySelector(".cart-feedback");
const addToBagButtons = document.querySelectorAll(".add-to-bag-button");

cartButton.addEventListener("click", () => {
    cartUI.open();
});

addToBagButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        const productName = button.dataset.product;

        const added = cart.add(productId);

        if (!added) {
            cartFeedback.textContent = "This product could not be added.";
            return;
        }

        cartUI.render();
        cartFeedback.textContent = `${productName} added to your bag.`;
    });
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector(".mobile-navigation");

if (menuToggle && mobileNavigation) {
    const closeMenu = () => {
        mobileNavigation.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            closeMenu();
            return;
        }

        mobileNavigation.hidden = false;
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    });

    mobileNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !mobileNavigation.hidden) {
            closeMenu();
            menuToggle.focus();
        }
    });
}
