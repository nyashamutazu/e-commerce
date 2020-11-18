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

exports.getAllProducts = (req, res, next) => {};

exports.getRelatedProducts = (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec()
    .then(products => {
      if (typeof products === "undefined" || products === null) {
        res.status(400).json({
          error: "Related products not found"
        });
      }
      return res.status(200).json({
        message: "Successfully got related products",
        data: products
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: erroHandler(err)
      });
    });
};

exports.getProductsBySearch = (req, res, next) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
          if (key === "price") {
              // gte -  greater than price [0-10]
              // lte - less than
              findArgs[key] = {
                  $gte: req.body.filters[key][0],
                  $lte: req.body.filters[key][1]
              };
          } else {
              findArgs[key] = req.body.filters[key];
          }
      }
  }

  Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec().then(response => {
        res.status(200).json({
          message: 'Successfully got products',
          data: {
            size: response.length,
            product: response
          }
      });
      }).catch(err => {
          if (err) {
              return res.status(400).json({
                  error: "Products not found"
              });
          }

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

    product = _.extend(product, feilds);

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

exports.photos = (req, res, next) => {
  if (req.product.photos) {
    // res.set('Content-Type', req.product.photos.contentType)
    return res.send(req.product.photos);
  }

  next();
}