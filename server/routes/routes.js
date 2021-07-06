import express from 'express';

const router = express.Router();


// testing
router.get('/', (req, res) => {
    res.json('Hello')
})



export default router;