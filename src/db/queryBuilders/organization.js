const db = require("../knex");

class Organization {
  /**
   * @param ids: organization id
   * @description : return specific organization
   */
  static async getById(ids) {
    return db("Organization")
      .returning("*")
      .where({ "Organization.id": ids })
      .then(org => {
        return org;
      });
  }
  /**
   * @param :null
   * @description : return all organizations
   */
  static async getAll() {
    return db("Organization").then(orgs => {
      return orgs;
    });
  }
  /**
   * @param :org : object of organization
   * @description : add new  organizations
   */
  static async createOrg(org) {
    return db("Organization")
      .returning("*")
      .insert({
        name: org.name,
        email: org.email,
        org_nr: org.org_nr
      })
      .then(org => {
        return org;
      });
  }
  /**
   * @param :org :object has the id of target org and the new info
   * @description : add new  organizations
   */
  static async updateOrg(org) {
    return db("Organization")
      .returning("*")
      .where({ id: org.id })
      .update({ name: org.name, email: org.email, org_nr: org.org_nr });
  }
  /**
   * @param :org :object has the id of target org and the new info
   * @description : add new  organizations
   */
  static async DeleteOrg(org) {
    return db("Organization")
      .where({ id: org.id })
      .del();
  }
  /**
   * @param :org:object has the id of target org and the new info
   * @description : check if org params are unique
   */
  static async checkOrg(name, email, org_nr) {
    return db("Organization")
      .where({ name: name })
      .orWhere({ email: email })
      .then(org => {
        return org;
      });
  }
}
module.exports = Organization;
