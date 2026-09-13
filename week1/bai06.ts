class Book {
    title: string;
    author: string;
    year: number;

    constructor(
        title: string,
        author: string,
        year: number
    ) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayInfo(): void {
        console.log(`Tên sách: ${this.title}`);
        console.log(`Tác giả: ${this.author}`);
        console.log(`Năm: ${this.year}`);
    }
}

const book = new Book(
    "Dế Mèn Phiêu Lưu Ký",
    "Tô Hoài",
    1941
);

book.displayInfo();