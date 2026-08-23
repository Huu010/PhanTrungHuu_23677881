interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`Thanh toán tiền mặt: ${amount} VNĐ`);
    }
}

class CardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Thanh toán bằng thẻ: ${amount} VNĐ`);
    }
}

const cashPayment = new CashPayment();
const cardPayment = new CardPayment();

cashPayment.pay(100000);
cardPayment.pay(200000);