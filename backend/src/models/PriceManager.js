const AbstractManager = require("./AbstractManager");

class PriceManager extends AbstractManager {
  constructor() {
    super({ table: "prices" });
  }

  insertPrice(price) {
    return this.database.query(
      `insert into ${this.table} (consultationType, price) values (?, ?)`,
      [price.consultationType, price.price]
    );
  }

  updatePrice(price) {
    return this.database.query(
      `update ${this.table} set consultationType = ?, price = ?
        where id = ?`,
      [price.consultationType, price.price, price.id]
    );
  }
}

module.exports = PriceManager;
