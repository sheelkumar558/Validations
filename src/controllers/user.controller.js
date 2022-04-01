const express = require("express");
const { body, validationResult } = require("express-validator");
//const { count } = require("../modules/user.modules");
const User = require("../modules/user.modules");

const router = express.Router();
//body(firstName).not().isEmpty(),body("email").isEamil()
router.post(
  "/",
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("first Name cannot empty")
    .isLength({ min: 5 })
    .withMessage("first name must be at least 4 charactors"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age annot be empty")
    .isNumeric()
    .withMessage("Age must be a number 1 to 120")
    .custom((value) => {
      if (value < 1 || value > 120) {
        throw new Error("Incorrect age Provided");
      }
      return true;
    }),
    body("password").not().isEmpty().withMessage("Password is required").custom((value)=>{
    const passw  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;   
    if(! value.match(passw)){
       throw new Error("Password must be strong");
    }
    return true;
    })
    .custom((value,{req})=>{
       if(value !== req.body.cPassword){
        throw new Error("Password and confirm password should match");
       }
       return true;
    }),
    body("lastName").custom((value)=>{
        if(value && value.length < 4){
         throw new Error("Last name if provide provide must be at least 4 char");
        }
        return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;
