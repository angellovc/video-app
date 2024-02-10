import passport from 'passport';
import LocalStrategy from './localStrategy';
import JwsStrategy from './jwtStrategy';

passport.use(LocalStrategy);
passport.use(JwsStrategy);

export default passport;
