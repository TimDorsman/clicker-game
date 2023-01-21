class Asset {
    constructor(type, name, income) {
        this.type = type;
        this.name = name;
        this.income = income;
        this.totalGeneratedIncome = 0;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getIncome() {
        return this.income;
    }

    getTotalGeneratedIncome() {
        return this.totalGeneratedIncome;
    }

    generateIncome() {
        this.totalGeneratedIncome += this.income;

        return this.income;
    }
}

module.exports = Asset;
