class Account {
    public username: string;
    private password: string;
    readonly accountId: number;

    constructor(
        username: string,
        password: string,
        accountId: number
    ) {
        this.username = username;
        this.password = password;
        this.accountId = accountId;
    }

    checkPassword(password: string): boolean {
        return this.password === password;
    }
}
const account = new Account(
    "admin",
    "123456",
    1001
);

console.log(account.username);
console.log(account.checkPassword("123456"));