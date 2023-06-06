const express = require("express");
const router = express.Router();

const { home, homeDummy } = require("../controllers/homeController");

router.get("/", home);
router.route("/dummy").get(homeDummy);
// router.get('/dummy', homedummy)

module.exports = router;