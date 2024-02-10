import { getUserById } from '@/services/user.service';
import {Strategy, ExtractJwt} from 'passport-jwt';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // TODO: ENV file
    secretOrKey: process.env.JWT_TOKEN_SECRET as string,
}

const JwtStrategy = new Strategy(options, async (payload, done) => {
  const user = await getUserById(payload.id);
  return done(null, user);
});

export default JwtStrategy