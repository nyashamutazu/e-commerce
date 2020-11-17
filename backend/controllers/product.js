const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const errorHandler = require("../helpers/dbErrorHandler");
const Product = require("../models/Product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .then(product => {
      if (typeof product === "undefined" || product === null) {
        res.status(400).json({
          error: "Product not found"
        });
      }

      req.product = product;

      next();
    })
    .catch(err => {
      return res.status(400).json({
        error: erroHandler(err)
      });
    });
};

exports.getProduct = (req, res, next) => {
  req.product.photos = undefined;

  return res.status(200).json({
    message: "Successfully got product",
    data: req.product
  });
};

exports.postProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, feilds, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    Object.keys(feilds).forEach(v => {
      if (typeof v === "undefined" || v === null) {
        return res.status(400).json({
          error: `Please enter value for ${v}`
        });
      }
    });

    let product = new Product(feilds);

    if (files.photos) {
      files.photos.forEach(photo => {
        if (photo.size > 1000000) {
          return res.status(400).json({
            error: `Image size for ${photo.name}, must be less that 1mb`
          });
        }

        product.photo.push({
          data: fs.readFileSync(photo.path),
          contentType: photo.type
        });
      });
    }

    product
      .save()
      .then(response => {
        res.status(200).json({
          message: "Successfully created product",
          data: response
        });
      })
      .catch(err => {
        res.status(400).json({
          error: errorHandler(err)
        });
      });
  });
};

exports.putProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, feilds, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    Object.keys(feilds).forEach(v => {
      if (typeof v === "undefined" || v === null) {
        return res.status(400).json({
          error: `Please enter value for ${v}`
        });
      }
    });

    let product = req.product;

    product = _.extend(product, feilds)

    if (files.photos) {
      files.photos.forEach(photo => {
        if (photo.size > 1000000) {
          return res.status(400).json({
            error: `Image size for ${photo.name}, must be less that 1mb`
          });
        }

        product.photo.push({
          data: fs.readFileSync(photo.path),
          contentType: photo.type
        });
      });
    }

    product
      .save()
      .then(response => {
        res.status(200).json({
          message: "Successfully created product",
          data: response
        });
      })
      .catch(err => {
        res.status(400).json({
          error: errorHandler(err)
        });
      });
  });
};

exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.product._id)
    .then(response => {
      return res.status(200).json({
        message: "Successfully got product",
        data: response
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: erroHandler(err)
      });
    });
};
