const db = require("../knex");
/**
 * get Admin by ID
 */
class Admin {
  static async getById(ids) {
    return db("Admin")
      .returning("*")
      .where({ id: ids })
      .then(admin => {
        return admin[0];
      });
  }
  /**
   *  addNewAdmin
   * @param {Admin object} data
   *  admin to data source
   */
  static async addNewAdmin(data) {
    return db("Admin")
      .returning("*")
      .insert({
        name: data.name,
        email: data.email,
        password: data.password
      });
  }
  /**
   *  get admin by email to check if there is a exist admin
   * @param {*} email
   */
  static getByEmail(email) {
    return db("Admin").where({ email: email });
  }
  /**
   * @param {*} email
   */
  static getOneByEmail(email1) {
    return db("Admin")
      .returning("*")
      .where({ email: email1 })
      .limit(1);
  }
  /**
   * Login
   * @param{email and password}
   */
  static async loginAdmin(email, password) {
    return db.where({ email: email, password: password });
  }
}
/////

module.exports = Admin;
