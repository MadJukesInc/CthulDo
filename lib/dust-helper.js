


(function (dust) {
    console.log('setuphelpers fires');
    dust.helpers.getUsername = function (chunk, context, bodies, params) {
        //var users = require('../models/users');
        //var id = dust.helpers.tap(params.id, chunk, context);
        //console.log(id);
        console.log('getUsername fires');
        //users.findById(id, function (err, result) {
        //    return chunk.write(result);
        //})
        return chunk.write('hello');
    };
})(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust);
//
//if(typeof exports !== 'undefined') {
//    module.exports = setupHelpers;
//}
//else {
//    setupHelpers(dust);
//}
