const mongoose = require("mongoose");

const ROLES = {
    ADMIN: "ADMIN",
    SUPERVISOR: "SUPERVISOR"
}

const userschema = mongoose.Schema({
    name: 
    {
       type: String,
       required: true,
    },
    email:
    {
       type: String,
       required: true,
    },
    passwordHash:
    {
       type: String,
       required: true,
    },
    phone:
    {
        type: String,
        required: true,
    },
    // IsAdmin:
    // {
    //     type: Boolean,
    //     default: ''
    // },
    // role:{
    //       type: String,
    //       enum:["Customer", "Admin", "Manager"],
    //       default:'Customer',
    // },
    street:
    {
        type: String,
        default: ''
    },
    Address:
    {
        type:String,
        default:''
    },
    zip:
    {
        type: String,
        default:''
    },
    city:
    {
        type: String,
        default: ''
    }
})

userschema.virtual('id').get(function() {
    return this._id.toHexString();
});

userschema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userschema);
module.exports.ROLES = ROLES;