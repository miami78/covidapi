const County = require('../models/countyModel');
const globalErr = require('../helpers/globalError');
const { utilGetAll, utilCreate, utilGetOne, utilDelete } = require('../helpers/utilService');

const countyController = {
    async create(req, res) {
        const { county_id, county, cases, recoveries, tests, deaths } = req.body;
        // this involves use of postGIS it will be revisited soon
        const point = {
            type: 'Point',
            coordinates: [req.body.lat, req.body.lon],
        };
        try {
            await utilCreate(req, res, County, {
                county_id,
                county,
                cases,
                recoveries,
                tests,
                deaths,
                position: point,
            });
        } catch (error) {
            console.log(error);
            res.status(422).json(globalErr);
        }
    },
    async getAll(req, res) {
        await utilGetAll(req, res, County);
    },
    async getOne(req, res) {
        const { id } = req.params;
        await utilGetOne(req, res, County, id);
    },
    async deleteCounty(req, res) {
        const { id } = req.params;
        try {
            utilDelete(req, res, County, id);
        } catch (error) {
            console.log(error);
            res.status(422).json(globalErr);
        }
    },
};

module.exports = countyController;
