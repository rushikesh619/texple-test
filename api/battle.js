const express = require('express');
const router = express.Router();
const Battle = require('../models/battles');
const Kings = require('../models/kings');
const battleServices = require('../services/battleServices');

// router.get('/', (req, res) => {
//     console.log('hello');
// })

// router.post('/', async (req, res) => {
//     console.log(req.body.king)
//     let king = new Kings({
//         name: req.body.king
//     });
//     king = await king.save();
//     console.log(king);
// })

router.get('/getInitialData', async (req, res) => {
    try {
        let result = await battleServices.getInitialData();
        result ? res.status(200).json({ result: result, success: true }) : res.status(200).json({ result: null, success: false });
    } catch (ex) {
        console.log(ex);
    }
})

router.get('/list', async (req, res) => {
    try {
        const result = await battleServices.list();
        result ? res.status(200).json({ result: result, success: true }) : res.status(200).json({ result: null, success: false });
    } catch (ex) {
        console.log(ex);
    }
})

router.get('/count', async (req, res) => {
    try {
        const result = await battleServices.count();
        result ? res.status(200).json({ result: result, success: true }) : res.status(200).json({ result: null, success: false });
    } catch (ex) {
        console.log(ex);
    }
})

router.get('/stats', async (req, res) => {
    try {
        const result = await battleServices.stats();
        result ? res.status(200).json({ result: result, success: true }) : res.status(200).json({ result: null, success: false });
    } catch (ex) {
        console.log(ex);
    }
})

router.get('/search', async (req, res) => {
    try {
        let param = req.query;
        console.log(param);
        const result = await battleServices.search(param);
        result ? res.status(200).json({ result: result, success: true }) : res.status(200).json({ result: null, success: false });
    } catch (ex) {
        console.log(ex);
    }
})

module.exports = router