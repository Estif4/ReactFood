const express = require("express");
const menumodel = require("../model/menu");
const router = express.Router();


// Route to fetch menu data
router.get("/", async (req, res) => {
  try {
    const menu = await menumodel.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;  
