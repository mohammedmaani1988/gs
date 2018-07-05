const express = require("express");
const router = express.Router();
const Org = require("./../../db/queryBuilders/organization");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateOrgInput = require("../../validation/organization");
router.get("/test", (req, res) => res.json({ msg: "worked" }));

/*
 *@uri: /org :
 *@desc: add new admin with encrypt password and fetch email avatar
 *@access : private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      Org.getAll().then(orgs => {
        if (orgs) {
          return res.json(orgs);
        } else {
          return res
            .status(404)
            .json({ msg: "there is no organization added" });
        }
      });
    }
  }
);

/*
 * @url  : /org/create
 * @desc : create new organization
 * @access : privte
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(Org.checkOrg(req.body.name, req.body.email));
    //validate inputs
    if (req.user) {
      const errors = validateOrgInput(req.body).errors;
      const isValid = validateOrgInput(req.body).isValid;
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const org = {
        name: req.body.name,
        email: req.body.email,
        org_nr: req.body.org_nr
      };
      Org.checkOrg(req.body.name, req.body.email, req.body.org_nr).then(
        chkorg => {
          if (chkorg.length > 0) {
            console.log(chkorg);
            return res
              .status(400)
              .json({ msg: " org Name or email or org number is exist" });
          }
        }
      );
      Org.createOrg(org).then(org => {
        return res.json(org[0]);
      });
    } else {
      return res.status(400).json({ authorization: "not authorized" });
    }
  }
);

/***
 * @url: PUT /org/:id
 * @desc : pudate selected org
 * @access: private
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(Org.checkOrg(req.body.name, req.body.email));
    //validate inputs
    if (req.user) {
      const errors = validateOrgInput(req.body).errors;
      const isValid = validateOrgInput(req.body).isValid;
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newOrg = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        org_nr: req.body.org_nr
      };
      // check if org is exist
      Org.getById(req.params.id).then(org => {
        if (org.length <= 0) {
          return res
            .status(400)
            .json({ msg: "there is no organization has this id" });
        }
      });
      // check if requested updates is not exist
      Org.checkOrg(req.body.name, req.body.email, req.body.org_nr).then(
        chkorg => {
          if (chkorg[0].id != req.params.id) {
            console.log(chkorg);
            return res
              .status(400)
              .json({ msg: " org Name or email or org number is exist" });
          }
        }
      );
      // update org row
      Org.updateOrg(newOrg).then(org => {
        return res.json(org[0]);
      });
    } else {
      return res.status(400).json({ authorization: "not authorized" });
    }
  }
);
/**
 * @url delete /org/:id
 * @desc: delete selected org
 * @access:private
 */

module.exports = router;
