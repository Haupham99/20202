import mongoose from "mongoose";

let Schema = mongoose.Schema;

let GroupSchema = new Schema({
    facultyId: String,
    groupName: String,
    avatar: {type: String, default: "default.jpg"},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

GroupSchema.statics = {
    addGroup(facultyId, groupName) {
        return this.create({"facultyId": facultyId, "groupName": groupName});
    },

    findByName(groupName){
        return this.findOne({"groupName": groupName});
    },

    findById(id) {
        return this.findOne({"_id": id}).exec();
    },

    updateGroup(groupId, filename){
        return this.findOneAndUpdate({"groupName": groupId}, {"avatar": filename}).exec(); //return old item after updated
    },

    getGroup(facultyId){
        return this.find({facultyId: facultyId}).exec();
    }
}

module.exports = mongoose.model("group", GroupSchema);