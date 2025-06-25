const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

// router.get("/", (req, res, next) => {
//   console.log("This always runs!");
//   next();
// });

router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  //   res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  const products = adminData.products;
  // res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
  });
});

module.exports = router;
