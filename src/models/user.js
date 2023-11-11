const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcrypt');
const { Roles } = require('../utils/roles.enum');

const UserSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [Roles.user, Roles.admin],
      default: 'user'
    },
    status: {
      type: Boolean,
      default: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => err ? cb(err) : cb(null, isMatch))
}
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('user', UserSchema);
