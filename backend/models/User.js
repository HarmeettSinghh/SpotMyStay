import mongoose from "mongoose"
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student", "owner", "admin"],
            default: "student",
        },

        //only owners need approval
        isApproved: {
            type: Boolean,
            default: function () {
                return this.role == "owner" ? false : true;
            },
        },
        // Wishlist for students
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Hostel",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

