const Category = require("../models/Category");
const Product = require("../models/Product");

const errorHandler = require("../helpers/dbErrorHandler");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id)
    .then(response => {
      if (typeof response === "undefined" || response === null) {
        res.status(400).json({
          error: "Category not found"
        });
      }

      req.category = response;
      next();
    })
    .catch(err => {
      res.status(400).json({
        error: "Category does not exist"
      });
    });
};

exports.getCategory = (req, res, next) => {
  return res.status(200).json({
    message: "Successfully found category",
    data: req.category
  });
};

exports.getCategories = (req, res, next) => {
  Product.distinct("category", {})
    .exec()
    .then(response => {

      res.status(200).json({
        message: "Successfully got categories",
        data: response
      });
    })
    .catch(err => {
      res.status(400).json({
        error: errorHandler(err)
      });
    });
};

exports.postCategory = (req, res, next) => {
  const category = new Category(req.body);

  category
    .save()
    .then(response => {
      res.status(200).json({
        message: "Successfully added category",
        data: response
      });
    })
    .catch(err => {
      res.status(400).json({
        error: errorHandler(err)
      });
    });
};

exports.putCategory = (req, res, next) => {
  const category = { ...req.category, name: req.body.name };

  Category.findByIdAndUpdate(req.category._id, category)
    .then(response => {
      res.status(200).json({
        message: "Successfully updated category",
        data: response
      });
    })
    .catch(err => {
      res.status(400).json({
        error: errorHandler(err)
      });
    });
};

exports.deleteCategory = (req, res, next) => {
  Category.findByIdAndDelete(req.category._id)
    .then(response => {
      res.status(200).json({
        message: "Successfully deleted category",
        data: response
      });
    })
    .catch(err => {
      res.status(400).json({
        error: errorHandler(err)
      });
    });
};
