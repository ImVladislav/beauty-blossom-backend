const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar"); // для генерації тимчасових аватарів
const path = require("path");
const fs = require("fs/promises");
const {nanoid} = require("nanoid");

const {User} = require("../models/user");

// const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { HttpError, ctrlWrapper } = require("../helpers");

const {SECRET_KEY, BASE_URL} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // для однакових строк хеш різний, (пароль, сіль)
    // сіль це набір випадкових символів
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    // Передайте адмінські права, якщо відповідний користувач
    const isAdmin = req.body.isAdmin;


    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationCode,
        isAdmin: isAdmin,
    });
    
    // const verifyEmail = {
    //     to: email,
    //     subject: "Verify email",
    //     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    // };

    // await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        country: newUser.country,
        city: newUser.city,
        isAdmin: newUser.isAdmin,
    })



    //     res.status(201).json({
    //     email: newUser.email,
    //     name: newUser.name,
        
    // })
// }

// const verifyEmail = async(req, res)=> {
//     const {verificationCode} = req.params;
//     const user = await User.findOne({verificationCode});
//     if(!user){
//         throw HttpError(401, "Email not found")
//     }
//     await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

//     res.json({
//         message: "Email verify success"
//     })
// }

// const resendVerifyEmail = async(req, res)=> {
//     const {email} = req.body;
//     const user = await User.findOne({email});
//     if(!user) {
//         throw HttpError(401, "Email not found");
//     }
//     if(user.verify) {
//         throw HttpError(401, "Email already verify");
//     }

//     const verifyEmail = {
//         to: email,
//         subject: "Verify email",
//         html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`
//     };

//     await sendEmail(verifyEmail);

//     res.json({
//         message: "Verify email send success"
//     })
 }

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password invalid");
    }

    // if(!user.verify) {
    //     throw HttpError(401, "Email not verified");
    // }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    // в bcrypt є метод компеір передаємо ( не захешований пароль, захешований )
    // якщо 2 арг є захешованою версією першого повертає тру 
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
     if (user.isAdmin) {
        user.isAdmin = true;
    }
    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23d"});
    // токен це пропуск складається з пейлоад(може бкти id користувачва)
// секретний ключ та час життя
// токен можна розкодувати
// const decodeToken = jwt.decode(tocken)
// console.log(decodeToken);
    await User.findByIdAndUpdate(user._id, {token});

    res.json({

    firstName: user.firstName,
    lastName: user.lastName,
    number: user.number,
    email: email,
    token: token,
    isAdmin: user.isAdmin,
    })
}

const getCurrent = async(req, res)=> {
    const {email, firstName, lastName, number} = req.user;

    res.json({
        email,
        firstName,
        lastName,
        number
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}

const updateAvatar = async(req, res)=> {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    // verifyEmail: ctrlWrapper(verifyEmail),
    // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}