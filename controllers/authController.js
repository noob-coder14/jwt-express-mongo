const User = require('../model/User');

//handle errors
const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = {email:'', password:''};

    //Duplicate errors
    if(err.code===11000){
        errors.email = "This email is already registered";
        return errors;
    }

    //Validation errors
    if(err.message.includes('userModel validation failed')){
        // console.log(err.message);
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
            console.log(errors);
        });
        return errors;
    }
    
}

//SIGNUP

module.exports.signup_get = async(req,res) => {
    //res.render('FOLDER_NAME') this FOLDER_NAME should be same as ejs view pages 
    await res.render(`signup`);
}

module.exports.signup_post = async(req,res) => {
    const { email, password } = req.body;
    
    try {
        const newUser = await User.create({email,password});
        res.status(201).json(newUser);
    } 
    catch (error) {
        const err = handleErrors(error)
        // console.log(error);
        res.status(400).send(err);
    }
}



//LOGIN requests

module.exports.login_get = async(req,res) => {
    await res.render(`login`);
}

module.exports.login_post = (req,res) => {
    const { email, password } = req.body;
    console.log('email -', email);
    console.log('password -', password);
    res.send('user_login');
}

// module.exports.signup_get = (req,res) => {
//     res.render('signup');
// }