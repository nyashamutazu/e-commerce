const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const uuid = require("uuid").v1;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: {
      type: String
    },
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

mongoose.plugin(uniqueValidator);

class UserClass {
  validatePassword(password) {
    return this.encryptPassword(password) === this.hashed_password;
  }

  setPassword(password) {
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  }

  encryptPassword(password) {
    if (typeof password === undefined || password === null) {
      return '';
    }

    return crypto
      .createHmac("sha1", this.salt)
      .update(password)
      .digest("hex");
  }

  createJWT() {
    return jwt.sign(
      { email: this.email, userId: this._id, name: this.name },
      process.env.JWT_SECRET
    );
  };

  toAuthJSON() {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      history: this.history
    }
  }
}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model("User", UserSchema);