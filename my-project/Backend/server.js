const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cartdata = require("./model/cart");
const checkoutdata = require("./model/checkout");
const cors = require("cors");
const dataInit = require("./utils/datainit");
const menuRoutes = require("./routes/menuroute");
const cartroutes = require("./routes/cartroutes");
const checkout = require("./routes/checkout");
const nodemailer = require("nodemailer");

dotenv.config();

const { NODE_ENV, PORT, EMAIL_USER, EMAIL_PASS } = process.env; // Correctly load from .env

const app = express();
app.use("/images", express.static("./public"));
app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
  }
});

function sendOrderConfirmationEmail(orderDetails) {
  const mailOptions = {
    from: EMAIL_USER, // Use EMAIL_USER from the environment
    to: `${orderDetails.email}`,
    subject: "Order Confirmation",
    text: `
      Hello ${orderDetails.fullname},

      Thank you for your order! Here are the details:

      - Full Name: ${orderDetails.fullname}
      - Email: ${orderDetails.email}
      - Total Price: ${orderDetails.totPrice}
      - Street: ${orderDetails.street || "N/A"}
      - Postal Code: ${orderDetails.postalcode}
      - City: ${orderDetails.city}

      We will process your order and send you a tracking number soon.

      Thank you for shopping with us!
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error while sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.use("/menu", menuRoutes);
app.use("/cart", cartroutes);
app.use("/checkout",checkout);



dataInit();
connectDB();

app.listen(PORT, () =>
  console.log(`server running in ${NODE_ENV} mode on port ${PORT}`)
);
