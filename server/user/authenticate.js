import jwt from 'jsonwebtoken'
import User from './UserModel.js'



const authenticate = async (req, res, next) => {
   // req.testas = "hello"
    let token = req.header('todo-auth')
    try {
        let decoded = await jwt.verify(token, 'superSecret') //decoded._id
        let user = await User.findOne({_id: decoded._id, "sessionTokens.token": token})
        if (!user) throw 'Authentication failed'
        req.user = user
        req.token = token
        next()
    } catch(e) {
        e = e.message == 'jwt malformed' ? 'Wrong session token' : e
        res.status(401).json(e)
    }

}

export default authenticate;