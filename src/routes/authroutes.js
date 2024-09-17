const { Router } = require("express");
const { loginUser, refreshToken } = require("../controllers/authcontroller");

const router = Router();

router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
