const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ api: "Welcome Hell" });
});

module.exports = router;
