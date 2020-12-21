const User = require('../models/user');
// const Email = require('./../utils/email')
const crypto = require('crypto');
const {
    promisify
} = require('util');
// const  = require('./../utils/');
const jwt = require('jsonwebtoken');
// const AppError = require('./../utils/appError');
const {
    response
} = require('express');

const signToken = (id) => {
    const temp ="secretkey";
    return jwt.sign({
        id
    }, temp, {
        expiresIn: 90
    });
}
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() +90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'successfully',
        token,
        data: {
            user
        }
    });
    user.password = undefined;
    console.log(res.cookie.jwt);
}

exports.logout = (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        status: 'success'
    })
}
exports.signup = (async (request, response, next) => {
    // const newUser = await User.create({
    //     name: request.body.name,
    //     email: request.body.email,
    //     password: request.body.password,
    //     confirmPassword: request.body.confirmPassword,
    // });

    const newUser = await User.create(request.body);
    console.log("user inserted");
    const token = signToken(newUser._id);
    response.json({message:"logged in", session: token})
});

exports.login = (async (req, res, next) => {
    // console.log("In auth");
    // let options = {
    //     maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    //     httpOnly: true, // The cookie only accessible by the web server
    // }

    // Set cookie 
    const {
        username,
        password
    } = req.body;


    // 1) Check if email and password exist
    if (!username || !password) {
        return next("None");
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({
        userName: username
    }).select('+password');
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.json({message:"invalid", session:""});
    }
    req.body.user = user;
    const session = signToken(user._id);
    user.loggedInToken = session;
    await user.save({
        validateBeforeSave: false
    });
    res.json({message:"logged in", session})
    // createSendToken(user, 200, response);
});

exports.protect = (async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    // // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    // // 4) Check if user changed password after the token was issued
    //decoded.iat is the JWT timeStamp
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }
    // // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

exports.isLoggedIn = async (req, res, next) => {
    // 1) Getting token and check of it's there
    try {
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next();
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        // // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next();
        }
        // // 4) Check if user changed password after the token was issued
        //decoded.iat is the JWT timeStamp
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next();
        }
        // // GRANT ACCESS TO PROTECTED ROUTE
        //res.locals is a way of passing data to pug template as they have access to it
        res.locals.user = currentUser;
        next();
    } catch (error) {
        return next();
    }

};


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        //{...roles}= ['admin', 'lead-guide']
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You are not authorized for doing this.', 403));
        }
        next();
    }
}


exports.forgotPassword = (async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return next((new AppError('Not found with this email', 404)));
    }
    const resetToken = user.creatPasswordResetToken();
    // await user.save();
    await user.save({
        validateBeforeSave: false
    });

    try {
        var host = "localhost:4200";
        const resetURL = `${req.protocol}://${host}/resetPassword/${resetToken}`;
        await email.sendEmail({
            email: user.email,
            subject: 'Request to reset password(valid for 10 minutes)',
            message: resetURL
        })

        // await new Email(user, resetURL).sendPasswordReset();
        // res.status(200).json({
        //     status: 'success-reset-password',
        //     message: 'token sent to email'
        // })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({
            validateBeforeSave: false
        });
        return next(new AppError('Error in sending mail', 500))
    }
    next();
});

exports.resetPassword = (async (req, res, next) => {
    //get the token from url
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    });
    //if not expired then allow to login
    if (!user) {
        return next((new AppError('Invalid token or token expired', 400)));
    }
    //updatepassword
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    //set token and login

    createSendToken(user, 200, res);
});

exports.updatePassword = (async (req, res, next) => {
    //get the user from database
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
        return next((new AppError('Not found with this ID', 404)));
    }
    //check if password is correct
    if (!await user.correctPassword(req.body.passwwordCurrent, user.password)) {
        return next(new AppError('incorrect password, cannot change it', 404))
    }
    //if yes, update with new password

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();
    //login user
    createSendToken(user, 200, res)
});