class Product {
    constructor(
        public name: string,
        public price: number
    ) {}
}

const products: Product[] = [
    new Product("Laptop", 500),
    new Product("Mouse", 50),
    new Product("Keyboard", 120),
    new Product("Monitor", 300)
];

const filteredProducts = products.filter(
    product => product.price > 100
);

filteredProducts.forEach(product => {
    console.log(
        `${product.name}: ${product.price}`
    );
});