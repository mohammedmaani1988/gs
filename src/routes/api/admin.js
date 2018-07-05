const express = require("express");
const router = express.Router();
const Admin = require("./../../db/queryBuilders/admin");
const bcrypt = require("bcryptjs"); // to encrypt password
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("./../../config/keys");
const validateRegisterInput = require("../../validation/registeration");
const validateLoginInput = require("../../validation/login");
router.get("/test", (req, res) => res.json({ msg: "worked" }));
/**
 * temp route to add the first admin
 */
router.post('/first',(req,res)=>{
  const newadmin = {
    name: 'mhmdmaani',
    email: 'mohammedmaani@hotmail.com',
    password: 'mhmd19881988'
  };
  // encrypt new admin password and save it in db
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newadmin.password, salt, (err, hash) => {
      if (err) throw err;
      newadmin.password = hash;
      addedAdmin = Admin.addNewAdmin(newadmin)
        .then(addedAdmin => {
          console.log(addedAdmin);
          return res.send(addedAdmin);
        })
        .catch(err => {
          throw err;
        });
    });
  });
  //end encryption
});
/**
 * register admin :
 * desc: add new admin with encrypt password and fetch email avatar
 * access : public
 */
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate inputs
    if (req.user) {
      const errors = validateRegisterInput(req.body).errors;
      const isValid = validateRegisterInput(req.body).isValid;
      if (!isValid) {
        return res.status(400).json(errors);
      }
      // check if admin email exists
      Admin.getByEmail(req.body.email)
        .then(admin => {
          console.log(admin.length);
          if (admin.length > 0) {
            // admin exists yes :
            console.log(admin.length);
            errors.email = "admin is already exists";
            return res.status(400).json(errors);
          } else {
            // avatar config and pass email
            console.log(admin.length);
            //create new admin model
            const newadmin = {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            };
            // encrypt new admin password and save it in db
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newadmin.password, salt, (err, hash) => {
                if (err) throw err;
                newadmin.password = hash;
                addedAdmin = Admin.addNewAdmin(newadmin)
                  .then(addedAdmin => {
                    console.log(addedAdmin);
                    return res.send(addedAdmin);
                  })
                  .catch(err => {
                    throw err;
                  });
              });
            });
            //end encryption
          }
        })
        .catch(err => console.log(err));
    } else {
      return res.status(400).json({ authorization: "not authorized" });
    }
  }
);
/**
 * login admin :
 * desc: login admin using email and password and return token
 * access : public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  Admin.getOneByEmail(req.body.email).then(admin => {
    if (admin.length <= 0) {
      return res.status(404).json({errors:"admin is not exist"});
    } else {
      admin = admin[0];
      console.log(admin);
      bcrypt.compare(req.body.password, admin.password).then(isMatch => {
        const payload = { id: admin.id, name: admin.name, email: admin.email };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "bearer " + token
          });
        });
      });
    }
  });
});
/**
 * current admin :
 * desc: get current admin
 * access : Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user[0]);
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
router.get("/logout", (req, res) => {
  jwt.invalidate();
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});
module.exports = router;
