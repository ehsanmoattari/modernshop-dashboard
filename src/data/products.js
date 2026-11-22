export const products = Object.freeze([
    {
        id: "forma-table-lamp",
        name: "Forma Table Lamp",
        priceCents: 8900,
        category: "Home objects",
        image: "/images/product-lamp.webp",
        alt: "Minimal ceramic table lamp",
    },
    {
        id: "sunday-ceramic-vase",
        name: "Sunday Ceramic Vase",
        priceCents: 4200,
        category: "Home objects",
        image: "/images/product-vase.webp",
        alt: "Sculptural neutral ceramic vase",
    },
    {
        id: "daily-form-tote",
        name: "Daily Form Tote",
        priceCents: 6800,
        category: "Everyday carry",
        image: "/images/product-tote.webp",
        alt: "Structured everyday tote bag",
    },
    {
        id: "classic-everyday-watch",
        name: "Classic Everyday Watch",
        priceCents: 12000,
        category: "Accessories",
        image: "/images/product-watch.webp",
        alt: "Minimal wristwatch with a neutral background",
    },
]);

export function getProductById(productId) {
    return products.find((product) => product.id === productId) ?? null;
}
