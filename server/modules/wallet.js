class Wallet {
    constructor() {
        if(Wallet.instance) {
            return Wallet.instance;
        }

        Wallet.instance = this;

        this.total = 2500;
    }

    addCoins(amount) {
        if(!this.validateAmount(amount)) {
            return;
        }

        this.total += amount;
    }

    takeCoins(amount) {
        if(!this.validateAmount(amount)) {
            return;
        }

        this.total -= amount;
    }

    getTotal() {
        return this.total;
    }

    validateAmount(amount) {
        if(!amount && isNaN(amount)) {
            throw new Error("Wallet can not be updated, invalid amount");
        }

        if(amount < 0) {
            throw new Error("Wallet can not be updated, amount is a negative number");
        }

        return true;
    }

    log(message) {
        console.log("[WALLET] - " + message)
    }
}

module.exports = Wallet;
