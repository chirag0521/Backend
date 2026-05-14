export async function registerUser(req, res, next) {
    //TOO WEAK PASSWORD 
    // try {
    //     throw new Error("Password is too weak");
    // } catch (err) {
    //     err.status = 400
    //     next(err)
    // }

    // USER ALREADY EXISTS

    try{
        throw new Error("User already exists, with same email")
    }catch(err){
        err.status = 409
        next(err)
    }
}