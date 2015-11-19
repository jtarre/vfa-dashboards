module.exports = function(app) {
    var jsforce = require('jsforce');
    var _       = require('underscore');
    var fellows = require('../../api/controllers/fellowController.js');

    app.get('/api/fellows', fellows.findAll);
    //app.get('/api/fellows/fellows/:id', fellows.findById);
}