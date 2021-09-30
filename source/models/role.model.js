import mongoose from "mongoose";

let Schema = mongoose.Schema;

let RoleSchema = new Schema({
    roleName: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

RoleSchema.statics = {
    findById(id) {
        return this.findOne({"_id": id}).exec();
    }
}

module.exports = mongoose.model("role", RoleSchema);