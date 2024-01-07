const fs = require('fs');
const path = require('path');

class ProductManager {
    static #products = [];
    static #totalSales = 0;
    static dataPath = path.join(__dirname, 'data', 'products.json');

    constructor() {
        this.init();
    }

    async init() {
        try {
            const file = await fs.promises.readFile(ProductManager.dataPath, 'utf-8');
            ProductManager.#products = JSON.parse(file);
        } catch (error) {
            await fs.promises.writeFile(ProductManager.dataPath, '[]', 'utf8');
        }
    }

    async create(data) {
        try {
            const product = {
                id: ProductManager.#products.length + 1,
                title: data.title,
                photo: data.photo,
                price: data.price || 10,
                stock: data.stock || 50,
            };

            if (!product.title || !product.photo) {
                throw new Error('Please, insert title & photo');
            }

            ProductManager.#products.push(product);
            await this.saveData();
            return true;
        } catch (error) {
            return { error: error.message };
        }
    }

    read() {
        try {
            if (ProductManager.#products.length === 0) {
                throw new Error('Not found products!');
            } else {
                return ProductManager.#products;
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    readOne(id) {
        try {
            const product = ProductManager.#products.find((each) => each.id === Number(id));
            if (!product) {
                throw new Error('Not found product!');
            } else {
                return product;
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    async sellProduct(quantity, productId) {
        try {
            if (!(quantity > 0)) {
                throw new Error('Insert valid quantity');
            } else {
                const product = this.readOne(productId);
                if (typeof product === 'string') throw new Error(product);
                if (quantity > product.stock) throw new Error('No more stock');
                product.stock -= quantity;
                ProductManager.#totalSales += quantity * product.price;
                await this.saveData();
                return true;
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    getTotalSales() {
        return ProductManager.#totalSales;
    }

    async saveData() {
        try {
            await fs.promises.writeFile(ProductManager.dataPath, JSON.stringify(ProductManager.#products, null, 2), 'utf8');
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = ProductManager;
