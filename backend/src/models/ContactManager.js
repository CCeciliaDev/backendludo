const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  updateContact(contact) {
    return this.database.query(`update ${this.table} set tel = ?, email = ?`, [
      contact.tel,
      contact.email,
    ]);
  }
}

module.exports = ContactManager;
