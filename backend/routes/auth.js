const router = require("express").Router();
const { registerValidation } = require("../controllers/auth.register.controller");

router.post("/register", (req, res) => {

  registerValidation(req, res);

});
module.exports = router;
