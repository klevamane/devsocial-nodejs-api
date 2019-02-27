import express from 'express';

let router = express.Router();

router.get('/test', (req, res) => res.json({ message: "checking that it works"}))

export default router;
