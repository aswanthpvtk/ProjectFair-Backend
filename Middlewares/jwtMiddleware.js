const jwt = require("jsonwebtoken")
const jwtMiddleware = (req, res, next) => {
    console.log("inside jwt middleware ");
    if(!req.headers['authorization']){
        req.status(401).json("Authorization failed please login")
    }
    const token = req.headers['authorization'].split(' ')[1];
    console.log("token:-", token);
    try {
        // jwt.verify() method is used to decrypt the token
        const jwtResponse = jwt.verify(token, "userpwd123")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId;
        next();

    }
    catch (err) {

        res.status(401).json( "Authorization failed please login")

    }
}
module.exports = jwtMiddleware;


// const jwt = require('jsonwebtoken');
// const jwtMiddleware = (req, res, next) => {
//     console.log("inside jwt middleware");
//     if (!req.headers['authorization']) {
//         res.status(401).json("Authorization failed , please login");
//     }
    
//     const token = req.headers['authorization'].split(' ')[1];
//     console.log("token:-", token);
//     try {
//         // jwt.verify() method is sued to decrypt the token 
//         const jwtResponse = jwt.verify(token, "userpwd123");
//         console.log(jwtResponse);
//         req.payload = jwtResponse.userId;
//         next();
//     }
//     catch (err) {
//         res.status(401).json("Authorization failed , please login");
//     }
// }
// module.exports = jwtMiddleware;