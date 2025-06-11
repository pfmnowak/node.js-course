const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const { title } = require("process");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  //   console.log("In another middleware!");
  //   res.send(
  //     '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button>ADD Product</button></form>'
  //   );

  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  console.log(req.body);
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
