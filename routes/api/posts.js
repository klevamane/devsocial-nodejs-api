import express from 'express';

const router = express.Router()

// @route   GET api/v1/posts/test
// @desc    Test posts endpoint
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'This is the endpoint for the user posts'}));

export default router;
