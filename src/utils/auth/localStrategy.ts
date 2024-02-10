import boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import { getUserByEmail } from '@/services/user.service';

const LocalStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email:string, password:string, done) => {
        try {
            const user = await getUserByEmail(email, true);
            console.log(user);
            const userPassword = user.password? user.password : ''
            const isMatch = await bcrypt.compare(password, userPassword);
            if (!isMatch) {
                done(boom.unauthorized("Incorrect Credentials"), false);
            } else {
                done(null, {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                });
            }
        } catch (error:any) {
            if (error.isBoom === true)
                done(null,false);
            else
                done(boom.badRequest(error.message), false)
        }
  }
);

export default LocalStrategy;