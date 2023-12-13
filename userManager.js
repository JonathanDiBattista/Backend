    class UserManager {
        static #users = [];
        id;
        name;
        photo;
        email;

        constructor(data) {
        this.id =
            UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1;
        this.name = data.name;
        this.photo = data.photo;
        this.email = data.email;
        UserManager.#users.push(this);
        }
    
        create(data) {
        const user = {
            id:
            UserManager.#users.length === 0
                ? 1
                : UserManager.#users[UserManager.#users.length - 1].id + 1,
            name: data.name,
            photo: data.photo,
            email: data.email,
        };
        UserManager.#users.push(user);
        }
    
        read() {
        return UserManager.#users;
        }
    
        readOne(id) {
        return UserManager.#users.find((each) => each.id === Number(id));
        }
    }
    
    const userManager = new UserManager({
        name: "Jonathan",
        photo: "https://i.pravatar.cc/300",
        email: "jonathan@gmail.com",
    });
    
    userManager.create({
        name: "Maria",
        photo: "https://i.pravatar.cc/300",
        email: "maria23@gmail.com",
    });

    userManager.create({
        name: "Alejandro",
        photo: "https://i.pravatar.cc/300",
        email: "alejandro21@gmail.com",
    });
    
    console.log(userManager.read());
    console.log(userManager.readOne(2));
    
    
    