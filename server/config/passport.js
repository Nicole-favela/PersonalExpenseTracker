import pkg from 'passport-jwt'
import User from '../models/User.js'
import * as dotenv from 'dotenv'
dotenv.config()

const JwtStrategy =pkg.Strategy
const ExtractJwt = pkg.ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; //secret to extract user from token

export default (passport)=>{
   
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById( jwt_payload._id )
        .then(user => {
        if (user){
         done(null, user);
        } 
        else {
         done(null, false);
        // or you could create a new account
        }
        })
        .catch(err => done(err, false));
        }));
        
        
        
        
        
        

}
