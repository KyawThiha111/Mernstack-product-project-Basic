import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
// Load environment variables
dotenv.config();

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    patients:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        }
    ]
}, { timestamps: true });

// Middleware to hash the password before saving
adminSchema.pre('save', function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return next(err); // Pass the error to the next middleware
        }
        this.password = hash; // Set the hashed password
        next(); // Call next() only after the password is hashed
    });
});

// Method to compare passwords
adminSchema.methods.passwordMatch = async function (password) {
    return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

// Method to generate a JWT token
adminSchema.methods.tokenEmit = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            position: this.position,
            email: this.email
        },
        process.env.JWT_TOKEN, // Use the JWT secret from environment variables
        { expiresIn: "1m" } // Token expires in 1 hour
    );
};

const Admin = model("admins", adminSchema);
export default Admin;