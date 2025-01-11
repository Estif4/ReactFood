const express = require("express");
const checkoutdata = require("../model/checkout");
const cartdata = require("../model/cart");
const router = express.Router();
const nodemailer = require("nodemailer");

// Create Nodemailer transporter using Gmail with App Password
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail service
  auth: {
    user: "estifk2@gmail.com", // Your Gmail address
    pass: "jybo tsmu rvex upcz", // Your App Password generated in Gmail
  },
});

// POST route for checkout
router.post("/", async (req, res) => {
  const { data, totPrice } = req.body;

  // Validate the input data
  if (
    !data ||
    !data.fullname ||
    !data.email ||
    !data.postalcode ||
    !data.city
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create checkout data
    const addeddata = await checkoutdata.create({
      ...data,
      totPrice: totPrice,
    });

    // Clear the cart
    await cartdata.deleteMany({});
    const cartItems = await cartdata.find({});

    // Prepare the email with HTML content for better presentation
    const mailOptions = {
      from: "estifk2@gmail.com", // Sender's email address
      to: data.email, // Customer's email address
      subject: "Order Confirmation", // Email subject
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h2 {
                color: #2c3e50;
                text-align: center;
              }
              p {
                font-size: 16px;
                line-height: 1.5;
                color: #555;
              }
              .total-price {
                font-size: 18px;
                font-weight: bold;
                color: #e74c3c;
              }
              .footer {
                text-align: center;
                font-size: 14px;
                color: #888;
                margin-top: 20px;
              }
              .footer a {
                color: #3498db;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Hello ${data.fullname},</h2>
              <p>Thank you for your purchase! Your order has been placed successfully.</p>
              <p class="total-price">Total Price: $${totPrice}</p>
              <p>We will process your order and ship it as soon as possible. You will receive a tracking email once your order has been dispatched.</p>
              <p>If you have any questions, feel free to <a href="mailto:estifk2@gmail.com">contact us</a>.</p>
              <div class="footer">
                <p>&copy; 2025 estif. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `, // HTML body content with inline CSS
    };

    // Send email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // Send the response to the client
    res.status(200).json({
      message:
        "Your order has been placed. A confirmation email will be sent to you shortly.",
      checkoutData: addeddata,
      clearedCart: cartItems,
    });
  } catch (err) {
    console.error("Error processing checkout:", err);
    res.status(500).json({ message: "Server error, try again later." });
  }
});

module.exports = router;
