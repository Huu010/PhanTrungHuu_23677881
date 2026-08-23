class BankAccount {
    balance: number;

    constructor(balance: number = 0) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            console.log("Số tiền nạp phải lớn hơn 0.");
            return;
        }

        this.balance += amount;
        console.log(`Đã nạp ${amount}`);
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Số tiền rút phải lớn hơn 0.");
            return;
        }

        if (amount > this.balance) {
            console.log("Số dư không đủ.");
            return;
        }

        this.balance -= amount;
        console.log(`Đã rút ${amount}`);
    }

    showBalance(): void {
        console.log(`Số dư: ${this.balance}`);
    }
}

const account = new BankAccount(100000);

account.deposit(50000);
account.withdraw(30000);
account.showBalance();