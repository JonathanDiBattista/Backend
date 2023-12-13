    class ProductManager {
    static #products = [];
    static #totalSales = 0;

    id;
    title;
    photo;
    price;
    stock;

    constructor(data) {
        this.id =
        ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id + 1;
        this.title = data.title;
        this.photo = data.photo;
        this.price = data.price || 10;
        this.stock = data.stock || 50;
        ProductManager.#products.push(this);
    }

    create(data) {
        const product = {
        id:
            ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id +
                1,
        title: data.title,
        photo: data.photo,
        price: data.price || 10,
        stock: data.stock || 50,
        };
        ProductManager.#products.push(product);
    }

    read() {
        return ProductManager.#products;
    }

    readOne(id) {
        return ProductManager.#products.find((each) => each.id === Number(id));
    }

    sellProduct(quantity, productId) {
        const product = this.readOne(productId);
        if (product && product.stock >= quantity) {
        product.stock -= quantity;
        ProductManager.#totalSales += quantity * product.price;
        return true;
        } else {
        return false;   
        }
    }

    getTotalSales() {
        return ProductManager.#totalSales;
    }
    }

    const productManager = new ProductManager({
    title: "Iphone 11",
    photo: "https://i.insider.com/5df10d81fd9db229ba736a77?width=1000&format=jpeg&auto=webp",
    price: 400,
    stock: 20,
    });

    productManager.create({
    title: "Iphone 12",
    photo: "https://www.macstation.com.ar/img/productos/2493-2317-1.jpg",
    price: 500,
    stock: 25,
    });

    productManager.create({
    title: "Iphone 13",
    photo: "https://www.tradeinn.com/f/13885/138855052/apple-iphone-13-128gb-6.1.jpg",
    price: 600,
    stock: 22,
    });

    productManager.create({
    title: "Iphone 14",
    photo: "https://i.blogs.es/d69481/iphone-14-00-01/1366_2000.jpg",
    price: 700,
    stock: 18,
    });

    productManager.sellProduct(4, 1);
    productManager.sellProduct(3, 4);
    productManager.sellProduct(7, 2);

    console.log(productManager.read());
    console.log("Ventas totales:", productManager.getTotalSales());
