module.exports = {
    getLeaders: (req, res, next) => {
        console.log('hit dishes get verb')
        res.end('Will send all the leaders to you');
    }
};
