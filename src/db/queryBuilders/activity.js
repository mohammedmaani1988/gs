const db = require("../knex");

class Activity {
  /**
   * @param ids: Activity id
   * @description : return specific Activity
   */
  static async getById(ids) {
    return db("Activity")
      .returning("*")
      .where({ "Activity.id": ids })
      .then(activity => {
        return activity;
      });
  }
  /**
   * @param :activity id
   * @description : return all activity activitys
   */
  static async getAll(activityID) {
    return db("Activity")
      .where({ "Activity.org_id": activityID })
      .then(activitys => {
        return activitys;
      });
  }
  /**
   * @param :activity : object of activity
   * @description : add new  activity
   */
  static async createActivity(activity) {
    return db("Activity")
      .returning("*")
      .insert({
        org_id: activity.org_id,
        name: activity.name,
        description: activity.description,
        type: activity.type,
        compulsory: activity.compulsory,
        image: activity.image,
        start_date: activity.start_date,
        end_date: activity.end_date,
        visible_from: activity.visible_from,
        visible_to:
          activity.visible_to
      })
      .then(activity => {
        return activity;
      });
  }
  /**
   * @param :activity :object has the id of target activity and the new info
   * @description : update activity
   */
  static async updateActivity(activity) {
    return db("Activity")
      .returning("*")
      .where({ id: activity.id })
      .update({
        org_id: activity.org_id,
        name  : activity.name,
        description: activity.description,
        type  : activity.type,
        compulsory: activity.compulsory,
        image : activity.image,
        start_date: activity.start_date,
        end_date  : activity.end_date,
        visible_from: activity.visible_from,
        visible_to:activity.visible_to
      });
  }
  /**
   * @param :activity :object has the id of target activity and the new info
   * @description : add new  activityanizations
   */
  static async Delete(activity) {
    return db("Activity")
      .where({ id: activity.id })
      .del();
  }
  /**
   * @param :activity:object has the id of target activity and the new info
   * @description : check if activity params are unique
   */
  static async checkActivity(org_id, name) {
    return db("Activity")
      .where({ name: name ,org_id:org_id })
      .then(activity => {
        return activity;
      });
  }
}
module.exports = Activity;
