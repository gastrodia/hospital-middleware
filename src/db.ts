var Datastore = require('nedb')
var db = {
    hospital: new Datastore({ filename: './tmp/hospital.db', autoload: true })
}

export { db as default }