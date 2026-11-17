import "../styles/main.css";

document.documentElement.dataset.app = "storefront";

const cartCount = document.querySelector(".cart-count");
const cartFeedback = document.querySelector(".cart-feedback");
const addToBagButtons = document.querySelectorAll(".add-to-bag-button");

let bagItemCount = 0;

addToBagButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productName = button.dataset.product;

        if (!productName || !cartCount || !cartFeedback) {
            return;
        }

        bagItemCount += 1;
        cartCount.textContent = String(bagItemCount);
        cartFeedback.textContent = `${productName} added to your bag.`;
    });
});

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
