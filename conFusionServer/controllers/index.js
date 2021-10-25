module.exports = {
    homepage: (req, res, next) => {
        res.render('index', { title: 'Express' });
    }
};
