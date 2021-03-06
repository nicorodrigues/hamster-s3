const { respond } = require('../helpers');
const health = require('../services/health');

const checkHealth = async (req, res) => {
    return respond(res, {
        data: await health.checkEverything()
    });
};

module.exports = {
    checkHealth
};