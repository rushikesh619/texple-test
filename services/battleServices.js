const Battle = require('../models/battles');
const Kings = require('../models/kings');

const getInitialData = async () => {
    const kings = await Kings.distinct('name');
    const battle_type = await Battle.distinct('battle_type');
    const location = await Battle.distinct('location');
    const region = await Battle.distinct('region');
    let result = {};
    result["kings"] = kings;
    result["battle_type"] = battle_type;
    result["location"] = location;
    result["region"] = region;
    console.log(result)
    return result;
}

const list = async () => {
    const battles = await Battle.find({});
    let result = [];
    battles.forEach((e) => {
        result.push(e.location);
    })
    console.log(result);
    return result;
}

const count = async () => {
    const count = await Battle.find({});
    let result = count.length;
    console.log(result);
    return result;
}

const stats = async () => {
    let result = {};
    let most_active = {};
    let attacker_outcome = {};
    let battle_type = [];
    let defender_size = {};
    const defender_king = await Battle.aggregate([
        {
            "$group": {
                "_id": {
                    "defender_king": "$defender_king",
                },
                "count": {
                    "$sum": 1
                }
            }
        },
        {
            "$sort": {
                "count": -1
            }
        }
    ]);

    const attacker_king = await Battle.aggregate([
        {
            "$group": {
                "_id": {
                    "attacker_king": "$attacker_king",
                },
                "count": {
                    "$sum": 1
                }
            }
        },
        {
            "$sort": {
                "count": -1
            }
        }
    ]);

    const region = await Battle.aggregate([
        {
            "$group": {
                "_id": {
                    "region": "$region",
                },
                "count": {
                    "$sum": 1
                }
            }
        },
        {
            "$sort": {
                "count": -1
            }
        }
    ]);

    most_active["defender_king"] = defender_king[0]._id.defender_king;
    most_active["attacker_king"] = attacker_king[0]._id.attacker_king;
    most_active["region"] = region[0]._id.region;

    const attackerOutcome = await Battle.aggregate([
        {
            "$group": {
                "_id": {
                    "attacker_outcome": "$attacker_outcome",
                },
                "count": {
                    "$sum": 1
                }
            }
        },
    ]);

    attacker_outcome["win"] = attackerOutcome[1].count;
    attacker_outcome["loose"] = attackerOutcome[0].count;

    battle_type = await Battle.distinct('battle_type');

    const defenderSize = await Battle.aggregate([
        {
            "$group": {
                "_id": null,
                "average": { "$avg": "$defender_size" },
                "maximum": { "$max": "$defender_size" },
                "minimum": { "$min": "$defender_size" }
            }
        },
    ]);

    defender_size["average"] = defenderSize[0].average;
    defender_size["maximum"] = defenderSize[0].maximum;
    defender_size["minimum"] = defenderSize[0].minimum;

    result["most_active"] = most_active;
    result["attacker_outcome"] = attacker_outcome;
    result["battle_type"] = battle_type;
    result["defender_size"] = defender_size;

    return result;

}

module.exports = {
    list, count, stats, getInitialData
}
