import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const playerSchema = new Schema({
    playerFName:{
        type: String,
        required: true,
        trim: true, // Removes whitespace from the beginning and end
    },
    playerLName:{
        type: String,
        required: true,
        trim: true, // Removes whitespace from the beginning and end
    },
    playerJerseyName: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from the beginning and end
    },
    playerJerseyNumber: {
        type: Number,
        required: true,
        trim: true, // Removes whitespace from the beginning and end
    },
    playerActive: {
        type: Boolean,
        default: true,
    },
    playerTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null,
    }

},{ timestamps: true }) // createdAt and updatedAt date types will be added to the scheme

const Player = model("Player", playerSchema);
export default Player;