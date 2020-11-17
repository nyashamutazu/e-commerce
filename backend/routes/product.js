const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");
const authMiddleware = require("../middleware/auth");

router.param("/:id", productController.getProductById);

router.get("/:id", productController.getProduct);

router.post(
  "/create/:userId",
  authMiddleware.requireAuth,
  authMiddleware.isAuthed,
  authMiddleware.isAdmin,
  productController.postProduct
);

router.put(
  "/:id/:userId",
  authMiddleware.requireAuth,
  authMiddleware.isAuthed,
  authMiddleware.isAdmin,
  productController.putProduct
);

router.delete(
  "/:id/:userId",
  authMiddleware.requireAuth,
  authMiddleware.isAuthed,
  authMiddleware.isAdmin,
  productController.deleteProduct
);

module.exports = router;
