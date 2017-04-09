import * as express from 'express';
import db from './db';

var router = express.Router();
var request = require('request')

import * as domain from 'domain';
import * as fs from 'fs';
import * as path from 'path';
router.get('/', function (req, res) {
    db.hospital.loadDatabase(function (err) {    // Callback is optional
        db.hospital.find({}).sort({ time: -1 }).exec(function (err, docs) {
            res.json({ errors: docs })
        });
    });
});

router.get('/page', function (req, res) {
    var content = fs.readFileSync(path.join(__dirname, '../public/index.html'))
    res.set('Content-Type', 'text/html');
    res.send(new Buffer(content));
})

router.post('/send', function (req, res) {
    var params = Object.assign({}, req.query, req.body);
    db.hospital.loadDatabase(function (err) {    // Callback is optional
        db.hospital.find({ _id: params._id }).exec(function (err, docs) {
            var item = docs[0];
            //request.post({url: "http://" + params.ip + '/convert',json:item.params},function(){})
            request.post("http://" + params.ip + '/convert').json(item.params).pipe(res)
        });
    });
});

router.post('/del', function (req, res) {
    var params = Object.assign({}, req.query, req.body);
    db.hospital.loadDatabase(function (err) {    // Callback is optional
        db.hospital.remove({ _id: params._id }, function (err, docs) {
            res.json({ ok: true })
        });
    });
});


export { router as default }