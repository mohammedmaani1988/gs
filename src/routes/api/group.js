const express = require("express");
const router = express.Router();
const Group = require("./../../db/queryBuilders/group");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateGroupInput = require("../../validation/group");
router.get("/test", (req, res) => res.json({ msg: "worked" }));

/*
 *@uri: /group :
 *@desc : add new group
 *@access: private
 */
router.get(
  "/:orgID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      Group.getAll(req.params.orgID).then(groups => {
        if (groups) {
          return res.json(groups);
        } else {
          return res
            .status(404)
            .json({ msg: "there is no groupanization added" });
        }
      });
    }
  }
);

/*
 * @url  : /group/create
 * @desc : create new groupanization
 * @access : privte
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(Group.checkGroup(req.body.org_id,req.body.name) );
    //validate inputs
    if (req.user) {
      const errors = validateGroupInput(req.body).errors;
      const isValid = validateGroupInput(req.body).isValid;
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const group = {
        name: req.body.name,
        org_id: req.body.org_id,
        description: req.body.description,
        correlation: req.body.correlation,
        occupancy: req.body.occupancy,
        hourly_billing: req.body.hourly_billing,
        holiday_pay: req.body.holiday_pay,
        substitute: req.body.substitute,
        substitute_effectivness: req.body.substitute_effectivness,
        administrative_costs_with_substitute:
        req.body.administrative_costs_with_substitute,
        administrative_costs_without_substitute:
        req.body.administrative_costs_without_substitute,
        production_loss: req.body.production_loss,
        profit: req.body.profit    
      };
      Group.checkGroup(req.body.org_id,req.body.name).then(
        chkgroup => {
          if (chkgroup.length > 0) {
            console.log(chkgroup);
            return res
              .status(400)
              .json({ msg: " group Name  is exist in the organization" });
          }
        }
      );
      Group.createGroup(group).then(group => {
        return res.json(group[0]);
      });
    } else {
      return res.status(400).json({ authorization: "not authorized" });
    }
  }
);

/***
 * @url: PUT /group/:id
 * @desc : update selected group
 * @access: private
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(Group.checkGroup(req.body.org_nr,req.body.name));
    //validate inputs
    if (req.user) {
      const errors = validateGroupInput(req.body).errors;
      const isValid = validateGroupInput(req.body).isValid;
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newGroup = {
        name: req.body.name,
        org_id: req.body.org_id,
        description: req.body.description,
        correlation: req.body.correlation,
        occupancy: req.body.occupancy,
        hourly_billing: req.body.hourly_billing,
        holiday_pay: req.body.holiday_pay,
        substitute: req.body.substitute,
        substitute_effectivness: req.body.substitute_effectivness,
        administrative_costs_with_substitute:
        req.body.administrative_costs_with_substitute,
        administrative_costs_without_substitute:
        req.body.administrative_costs_without_substitute,
        production_loss: req.body.production_loss,
        profit: req.body.profit    
      };
      // check if group is exist
      Group.getById(req.params.id).then(group => {
        if (group.length <= 0) {
          return res
            .status(400)
            .json({ msg: "there is no group has this id" });
        }
      });
      // check if requested updates is not exist
      Group.checkGroup(req.body.group_nr , req.body.name).then(
        chkgroup => {
          if (chkgroup[0].id != req.params.id) {
            console.log(chkgroup);
            return res
              .status(400)
              .json({ msg: " group Name or email or group number is exist" });
          }
        }
      );
      // update group row
      Group.updateGroup(newGroup).then(group => {
        return res.json(group[0]);
      });
    } else {
      return res.status(400).json({ authorization: "not authorized" });
    }
  }
);
/**
 * @url delete /group/:id
 * @desc: delete selected group
 * @access:private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
  }
);
module.exports = router;
