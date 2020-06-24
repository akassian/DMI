const db = require('../db');

/** Collection of related methods for strings. */

class StringModel {
  /* Return array of strings data:
   *
   * => [ string1, string2 ... ]
   *
   * */

  static async findAll() {
    const res = await db.query(
      `SELECT text
       FROM strings`,
    );

    return res.rows;
  }

  /* Create string in database from data, return string data:
   * string => string
   */

  static async create(data) {
    const res = await db.query(
      `INSERT INTO strings (text)
       VALUES ($1)
       RETURNING text`,
      [data],
    );

    return res.rows[0];
  }
}

module.exports = StringModel;
