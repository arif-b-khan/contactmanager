import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";


@ApiModel({
    description: "User Profile",
    name: "Profile"
})
export class Profile {
    @ApiModelProperty({
        description : "Profile Name" ,
        required : true,
        example: ['John']
    })
    name: string;
    @ApiModelProperty({
        description : "Gender of a person" ,
        required : true,
        example: ['Male']
    })
    gender: string;
    @ApiModelProperty({
        description : "Address of a Person" ,
        required : false,
        example: ['1/11 Madisson Square Garden']
    })
    location: string;
    @ApiModelProperty({
        description : "Website of a person" ,
        required : false,
        example: ['1/11 Madisson Square Garden']
    })
    website: string;
    
    @ApiModelProperty({
        description : "Picture of a person" ,
        required : false,
        example: ['/usr/home/profile.jpg']
    })
    picture: string;
}

@ApiModel({
    description: "User Documents",
    name: "UserDocument"
})
export class UserDocument extends mongoose.Document {
    @ApiModelProperty({
        description : "Email address of a person" ,
        required : false,
        example: ['admin@gmail.com']
    })
    email: string;
    
    @ApiModelProperty({
        description : "Password" ,
        required : false,
        example: ['password']
    })
    password: string;
    
    @ApiModelProperty({
        description : "Password reset token" ,
        required : false,
        example: ['password']
    })
    passwordResetToken: string;
    
    @ApiModelProperty({
        description : "Password expires in time" ,
        required : false,
        example: ['Date.now()']
    })
    passwordResetExpires: Date;
    
    @ApiModelProperty({
        description : "Facebook credentials" ,
        required : false,
        example: ['asdfqwer123asdfaqwefasda']
    })
    facebook: string;

    @ApiModelProperty({
        description : "Authenticate tokens" ,
        required : false,
        example: ['[\'asdfqwer123asdfaqwefasda\', \'asdfasdfasd\']']
    })
    tokens: AuthToken[];
    @ApiModelProperty({
        description : "Profile" ,
        required : false
    })
    profile: Profile;
    comparePassword: comparePasswordFunction;
    gravatar: (size: number) => string;

}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number = 200) {
    const self: any = this;
    if (!self.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(self.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const User = mongoose.model<UserDocument>("User", userSchema);
