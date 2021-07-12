import express from 'express';
import UserControler from '../user/userControler.js'


const router = express.Router();


// testing
router.get('/', (req, res) => {
    res.json('Hello')
})

// user
router.post('/signup', UserControler.signUp);
router.post('/login', UserControler.logIn);




export default router;