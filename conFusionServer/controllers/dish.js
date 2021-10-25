module.exports = {
    getDishes: (req, res, next) => {
        console.log('hit dishes get verb')
        res.end('Will send all the dishes to you');
    }
};
