const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// register

const registerUser = async (req, res) => {
    // console.log(req.body)
    let { userName, email, password } = req.body || {};

    // Check if any required field is missing or empty
    if (!userName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields",
        });
    }


    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ userName , email, password : hashedPassword });
        console.log(newUser);
        await newUser.save();
       return  res.status(200).json({
            success: true,
            message: "registration successfull"
        })

    }
    catch (e) {

        console.log(e.message);

        return res.status(500).json({
            success: false,
            message: "Some error occurred while registering",
        });

    }
}





// login


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        console.log(checkUser)
        if (!checkUser) return res.status(401).json({
            success: false,
            message: "user doesn't exists! please register first"
        })

        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if (!checkPassword)
            return res.status(401).json({
                success: false,
                message: "Incorrect password! Please try again"
            })

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName : checkUser.userName
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' })

       return res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in succesfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName :checkUser.userName,
            }
        })

    }
    catch (e) {

        console.log(e);

       return res.status(500).json({
            success: false,
            message: "some error occured",
        });

    }
}





// logout

const logoutUser = (req, res) => {
   return res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    })
}

// auth middleware

const authMidddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
       return res.status(401).json({
            success: false,
            message: "Unauthorised User"
        })
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({
            success: false,
            message: 'unauthorised',
        })

    }

}



module.exports = { registerUser, loginUser, logoutUser, authMidddleware };