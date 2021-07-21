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

router.post('/insertbattle', async (req, res) => {
    try {
        if (req.body) {
            if (req.body.name && req.body.year && req.body.attacker_king && req.body.defender_king) {
                let battle = new Battle({
                    name: req.body.name,
                    year: req.body.year,
                    battle_number: req.body.battle_number,
                    attacker_king: req.body.attacker_king,
                    defender_king: req.body.defender_king,
                    attacker_1: req.body.attacker_1,
                    attacker_2: req.body.attacker_2,
                    attacker_3: req.body.attacker_3,
                    attacker_4: req.body.attacker_4,
                    defender_1: req.body.defender_1,
                    defender_2: req.body.defender_2,
                    defender_3: req.body.defender_3,
                    defender_4: req.body.defender_4,
                    attacker_outcome: req.body.attacker_outcome,
                    battle_type: req.body.battle_type,
                    major_death: req.body.major_death,
                    major_capture: req.body.major_capture,
                    attacker_size: req.body.attacker_size,
                    defender_size: req.body.defender_size,
                    attacker_commander: req.body.attacker_commander,
                    defender_commander: req.body.defender_commander,
                    summer: req.body.summer,
                    location: req.body.location,
                    region: req.body.region,
                    note: req.body.note
                })
                battle = await battle.save();
                console.log(battle);
            } else {
                throw {
                    message: "Not allowd!"
                }
            }
        } else {
            throw {
                message: "can't get request body"
            }
        }
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