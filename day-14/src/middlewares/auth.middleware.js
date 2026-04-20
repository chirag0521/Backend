const jwt = require("jsonwebtoken")

// yeh function token nikalta hai or token ke under se read karta hai ki konse user ne request ki hai
async function identifyUser(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not provided: unauthorised access"
        })
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "unauthorised access"
        })
    }

    //req.user ek naya property hai or usme decoded set kar diya
    req.user = decoded

    next()
}

module.exports = identifyUser