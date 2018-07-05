const express = require("express");
const router = express.Router();
const Activity = require("./../../db/queryBuilders/activity");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateActivityInput = require("../../validation/activity");
router.get("/test", (req, res) => res.json({ msg: "worked" }));

/*
 *@uri: /activity :
 *@desc : add new activity
 *@access: private
 */
router.get(
  "/:orgID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      Activity.getAll(req.params.orgID).then(activitys => {
        if (activitys) {
          return res.json(activitys);
        } else {
          return res
            .status(404)
            .json({ msg: "there is no activity added" });
        }
      });
    }
  }
);

/*
 * @url  : /activity/create
 * @desc : create new activityanization
 * @access : privte
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(Activity.checkActivity(req.body.org_id,req.body.name) );
    //validate inputs
    if (req.user) {
      const errors = validateActivityInput(req.body).errors;
      const isValid = validateActivityInput(req.body).isValid;
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const activity = {
        org_id: req.body.org_id,
        name  : req.body.name,
        description: req.body.description,
        type  : req.body.type,
        compulsory: req.body.compulsory,
        image : req.body.image,
        start_date: req.body.start_date,
        end_date  : req.body.end_date,
        visible_from: req.body.visible_from,
        visible_to:req.body.visible_to
      };
      Activity.checkActivity(req.body.org_id,req.body.name).then(
        chkactivity => {
          if (chkactivity.length > 0) {
            console.log(chkactivity);
            return res
              .status(400)
              .json({ msg: " activity Name  is exist in the organization" });
          }
        }
      );
      Activity.createActivity(activity).then(activity => {
        return res.json(activity[0]);
      });
    } else {
      return res.status(400).json({ authorization: "not authorized" });
    }
  }
);

/***
 * @url: PUT /activity/:id
 * @desc : update selected activity
 * @access: private
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(Activity.checkActivity(req.body.org_nr,req.body.name));
    //validate inputs
    if (req.user) {
      const errors = validateActivityInput(req.body).errors;
      const isValid = validateActivityInput(req.body).isValid;
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newActivity = {
        org_id: req.body.org_id,
        name  : req.body.name,
        description: req.body.description,
        type  : req.body.type,
        compulsory: req.body.compulsory,
        image : req.body.image,
        start_date: req.body.start_date,
        end_date  : req.body.end_date,
        visible_from: req.body.visible_from,
        visible_to:req.body.visible_to
      };
      // check if activity is exist
      Activity.getById(req.params.id).then(activity => {
        if (activity.length <= 0) {
          return res
            .status(400)
            .json({ msg: "there is no activity has this id" });
        }
      });
      // check if requested updates is not exist
      Activity.checkActivity(req.body.org_nr , req.body.name).then(
        chkactivity => {
          if (chkactivity[0].id != req.params.id) {
            console.log(chkactivity);
            return res
              .status(400)
              .json({ msg: " activity Name or email or activity number is exist" });
          }
        }
      );
      // update activity row
      Activity.updateActivity(newActivity).then(activity => {
        return res.json(activity[0]);
      });
    } else {
      return res.status(400).json({ authorization: "not authorized" });
    }
  }
);
/**
 * @url delete /activity/:id
 * @desc: delete selected activity
 * @access:private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
  }
);
module.exports = router;
