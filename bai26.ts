class Product {
    constructor(
        public name: string,
        public price: number
    ) {}
}

class Order {
    products: Product[];

    constructor(products: Product[] = []) {
        this.products = products;
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    calculateTotal(): number {
        return this.products.reduce(
            (total, product) => total + product.price,
            0
        );
    }
}

const order = new Order();

order.addProduct(
    new Product("Laptop", 1500)
);

order.addProduct(
    new Product("Mouse", 50)
);

order.addProduct(
    new Product("Keyboard", 100)
);

console.log(
    `Tổng tiền: ${order.calculateTotal()}`
);