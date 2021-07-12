import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './UserModel.js';


const signUp = async(req, res) => {
    let user = new User(req.body)

    try {
        let createdUser = await user.save()
        res.json(createdUser)

    } catch(e) {
        res.status(400).json(e)
    }
}

const logIn = async(req, res) => {
    try {
        let user = await User.findOne({
            username: req.body.username
        })
        if(!user) throw "User doesn't exist"

        let response = await bcrypt.compare(req.body.password, user.password)
        if(!response) throw 'Incorect password'

        let token = await jwt.sign({_id: user._id.toHexString()}, 'superSecret').toString()
        user.sessionTokens.push({token})
        await user.save()
        res.header('todo-auth', token).json(user)


        await res.json(req.user)
        console.log(user)

    } catch(e) {
        res.status(401).json(e)
    }
}


export default {
    signUp, 
    logIn
}