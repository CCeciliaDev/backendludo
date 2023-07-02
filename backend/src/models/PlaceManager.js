const AbstractManager = require("./AbstractManager");

class PlaceManager extends AbstractManager {
  constructor() {
    super({ table: "places" });
  }

  findAllPlace() {
    return this.database.query(
      `select * FROM ${this.table}
      ORDER BY placeName ASC`
    );
  }

  insertPlace(place) {
    return this.database.query(
      `insert into ${this.table} (placeName, address, CP, city, urlImg, time1, time2, time3) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        place.placeName,
        place.address,
        place.CP,
        place.city,
        place.urlImg,
        place.time1,
        place.time2,
        place.time3,
      ]
    );
  }

  updatePlace(place) {
    return this.database.query(
      `update ${this.table} set placeName = ?, address = ?, CP = ?, city = ?, urlImg = ?, time1= ?, time2 = ?, time3 = ?
        where id = ?`,
      [
        place.placeName,
        place.address,
        place.CP,
        place.city,
        place.urlImg,
        place.time1,
        place.time2,
        place.time3,
        place.id,
      ]
    );
  }
}

module.exports = PlaceManager;
