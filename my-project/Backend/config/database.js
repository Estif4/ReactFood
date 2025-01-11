const { PORT, NODE_ENV, DATABASE, DATABASE_PASSWORD } = process.env;
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      process.env.DATABASE.replace(
        "<db_password>",
        process.env.DATABASE_PASSWORD
      ),
      {
        serverSelectionTimeoutMS: 20000,
      }
    )
    .then(() => console.log(`Database connected`))
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDB;
