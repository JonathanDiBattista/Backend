const ProductManager = require('./productManager');
const UserManager = require('./userManager');

const productManager = new ProductManager();
const userManager = new UserManager();

(async () => {
    const createProductResult = await productManager.create({
        title: 'Nuevo Producto',
        photo: 'https://example.com/new-product.jpg',
        price: 100,
        stock: 10,
    });

    console.log(createProductResult);

    const readProductsResult = await productManager.read();
    console.log(readProductsResult);

    const createUserResult = await userManager.create({
        name: 'Nuevo Usuario',
        photo: 'https://example.com/new-user.jpg',
        email: 'newuser@example.com',
    });

    console.log(createUserResult);

    const readUsersResult = await userManager.read();
    console.log(readUsersResult);

    const readOneUserResult = await userManager.readOne(1);
    console.log(readOneUserResult);


})();
