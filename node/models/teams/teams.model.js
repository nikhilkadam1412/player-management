import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: [true, "Team name required"],
        unique: true,
    },
    teamCaptain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player', // Reference to Player model
        default: null,
    },
    teamPlayers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        }],
        default: [],
    }
},{ timestamps: true }) // createdAt and updatedAt date types will be added to the scheme

const Team = model("Team",teamSchema);
export default Team;