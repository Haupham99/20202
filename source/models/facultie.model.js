import mongoose from "mongoose";

let Schema = mongoose.Schema;

let FacultieSchema = new Schema({
    facultyName: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

FacultieSchema.statics = {
    addFaculty(facultyName) {
        return this.create({"facultyName": facultyName});
    },

    findAll(){
        return this.find({}).exec();
    },

    findByName(facultyName){
        return this.findOne({"facultyName": facultyName})
    }
}

module.exports = mongoose.model("facultie", FacultieSchema);