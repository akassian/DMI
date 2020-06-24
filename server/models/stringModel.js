/* REAL SQL DB */
// const database = require('../db');

/* FAKE UNPERSISTED DB */
const database = require('../fakeDB');

/** Collection of related methods for strings. */

class StringModel {
  /* Return array of strings data:
   *
   * => [ string1, string2 ... ]
   *
   * */

  static async findAll() {
    /* VERSION USING REAL SQL DB */

    // const res = await db.query(
    //   `SELECT id, text
    //    FROM strings
    //    ORDER BY id`,
    // );
    // return res.rows;

    /* USING FAKE UNPERSISTED DB */
    return database;
  }

  /* Create string in database from data, return string data:
   * string => string
   */

  static async create(data) {
    /* VERSION USING REAL SQL DB */

    // const res = await db.query(
    //   `INSERT INTO strings (text)
    //    VALUES ($1)
    //    RETURNING id, text`,
    //   [data],
    // );
    // return res.rows[0];

    /* USING FAKE UNPERSISTED DB */
    database.unshift(data);
    return data;
  }
}

module.exports = StringModel;
