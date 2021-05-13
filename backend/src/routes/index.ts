import express from 'express';
import archive from './archive';

const router = express.Router();

// const image = require("./image");

router.use('/archive', archive);

export default router;
