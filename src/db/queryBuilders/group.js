const db = require("../knex");

class Group {
  /**
   * @param ids: Group id
   * @description : return specific Group
   */
  static async getById(ids) {
    return db("Group")
      .returning("*")
      .where({ "Group.id": ids })
      .then(group => {
        return group;
      });
  }
  /**
   * @param :group id
   * @description : return all group groups
   */
  static async getAll(org_id) {
    return db("Group")
      .where({ "Group.org_id": org_id })
      .then(groups => {
        return groups;
      });
  }
  /**
   * @param :group : object of group
   * @description : add new  group
   */
  static async createGroup(group) {
    return db("Group")
      .returning("*")
      .insert({
        org_id: group.org_id,
        name: group.name,
        description: group.description,
        correlation: group.correlation,
        occupancy: group.occupancy,
        hourly_billing: group.hourly_billing,
        holiday_pay: group.holiday_pay,
        substitute: group.substitute,
        substitute_effectivness: group.substitute_effectivness,
        administrative_costs_with_substitute:
          group.administrative_costs_with_substitute,
        administrative_costs_without_substitute:
          group.administrative_costs_without_substitute,
        production_loss: group.production_loss,
        profit: group.profit
      })
      .then(group => {
        return group;
      });
  }
  /**
   * @param :group :object has the id of target group and the new info
   * @description : update group
   */
  static async updateGroup(group) {
    return db("Group")
      .returning("*")
      .where({ id: group.id })
      .update({
        org_id: group.org_id,
        name: group.name,
        description: group.description,
        correlation: group.correlation,
        occupancy: group.occupancy,
        hourly_billing: group.hourly_billing,
        holiday_pay: group.holiday_pay,
        substitute: group.substitute,
        substitute_effectivness: group.substitute_effectivness,
        administrative_costs_with_substitute:
          group.administrative_costs_with_substitute,
        administrative_costs_without_substitute:
          group.administrative_costs_without_substitute,
        production_loss: group.production_loss,
        profit: group.profit
      });
  }
  /**
   * @param :group :object has the id of target group and the new info
   * @description : add new  groupanizations
   */
  static async Delete(group) {
    return db("Group")
      .where({ id: group.id })
      .del();
  }
  /**
   * @param :group:object has the id of target group and the new info
   * @description : check if group params are unique
   */
  static async checkGroup(org_id, name) {
    return db("Group").returning('*') 
      .where({ name: name ,org_id:org_id })
      .then(group => {
        return group;
      });
  }
}
module.exports = Group;
