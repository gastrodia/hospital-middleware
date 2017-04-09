
import * as domain from 'domain';
import db from './db';

const d = domain.create();
d.on('error', (er) => {
    er.time = new Date()
    db.hospital.insert(er)
});



export function middleware(req,res,next){
    d.run(() => {
        next(req,res); 
    });
}

