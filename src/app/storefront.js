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
