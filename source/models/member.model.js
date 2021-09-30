import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MemberSchema = new Schema({
    groupId: String,
    roleId: String,
    email: {type: String, trim: true},
    isStudy: {type: Boolean, default: true},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

MemberSchema.statics = {
    findByEmail(email) {
        return this.findOne({"email": email, "isStudy": true}).exec();
    },

    findByEmailNone(email) {
        return this.findOne({"email": email, "isStudy": false}).exec();
    },

    getMember(groupId){
        return this.find({groupId: groupId, "isStudy": true}).exec();
    },

    addMember(email, groupId, roleId){
        return this.create({email: email, groupId: groupId, roleId: roleId});
    },

    editMember(email){
        return this.findOneAndUpdate(
            {email: email, isStudy: true},
            {"isStudy": false, "deletedAt": Date.now()}
        ).exec();
    }
}

module.exports = mongoose.model("member", MemberSchema);