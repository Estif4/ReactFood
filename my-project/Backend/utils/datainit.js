const menumodel = require("../model/menu");  
const menudata = require("../data/data.json");

async function datacreate() {
  const existingData = await menumodel.find();
  try {
    if (existingData.length === 0) {
      await menumodel.create(menudata);
      console.log("Data created successfully");
    } else {
      console.log("Data already exists");
    }
  } catch (err) {
    console.log(`Error creating data: ${err.message}`);
  }
}

module.exports = datacreate;
