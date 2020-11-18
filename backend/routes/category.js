const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const categoryController = require("../controllers/category");

router.param("categoryId", categoryController.getCategoryById);

router.get('/', categoryController.getCategories);
router.get("/:categoryId", categoryController.getCategory);

router.post(
  "/create",
  authMiddleware.requireAuth,
  authMiddleware.isAuthed,
  authMiddleware.isAdmin,
  categoryController.postCategory
);
router.post(
  "/:categoryId/:userId",
  authMiddleware.requireAuth,
  authMiddleware.isAuthed,
  authMiddleware.isAdmin,
  categoryController.putCategory
);

router.delete(
  "/:categoryId/:userId",
  authMiddleware.requireAuth,
  authMiddleware.isAuthed,
  authMiddleware.isAdmin,
  categoryController.deleteCategory
);

module.exports = router;
