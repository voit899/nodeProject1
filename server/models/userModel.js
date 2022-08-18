const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'you must enter a name'],
            trim: true,
            minlength: [1, 'please provide non empty name'],
            maxlength: [20, "name can't be longer than 20 characters"],
        },
        password: {
            type: String,
            required: [true, 'you must enter a password'],
            trim: true,
            select: false,
            minlength: 1,
        },
        email: {
            type: String,
            required: [true, 'you must enter an email'],
            unique: [true, 'email already in use'],
            min: [6, 'please provide non empty email'],
            max: [50, 'too long email address'],
            validate: [isEmail, 'invalid email'],
        },
        active: {
            type: Boolean,
            default: true,
        },
        confirmPassword: {
            type: String,
            required: true,
            validate: {
                validator: function (confirmPassword) {
                    return confirmPassword === this.password;
                },
                message: "passwords don't match",
            },
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    }
);

// middleware that encrypts passwords
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $eq: true } });
    // this.find({ active: { $ne: false } }); the same as line 63
    next();
});

const User = mongoose.model('Users', userSchema);
module.exports = User;