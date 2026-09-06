class Book {
    constructor(
        public title: string,
        public author: string
    ) {}
}

class User {
    constructor(
        public name: string
    ) {}
}

class Library {
    books: Book[] = [];
    users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    displayBooks(): void {
        console.log("Danh sách sách:");

        this.books.forEach(book => {
            console.log(`${book.title} - ${book.author}`);
        });
    }

    displayUsers(): void {
        console.log("Danh sách người dùng:");

        this.users.forEach(user => {
            console.log(user.name);
        });
    }
}

const library = new Library();

library.addBook(
    new Book("Dế Mèn Phiêu Lưu Ký", "Tô Hoài")
);

library.addUser(
    new User("Nguyễn Văn A")
);

library.displayBooks();
library.displayUsers();