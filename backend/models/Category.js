const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

mongoose.plugin(uniqueValidator);

class CategoryClass {

}

CategorySchema.loadClass(CategoryClass);

module.exports = mongoose.model("Category", CategorySchema);