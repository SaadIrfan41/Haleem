import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from '../database/db.js';

export const configurePassport = () => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db('users').where({ username }).first();
            if (!user) return done(null, false, { message: 'Incorrect username.' });

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db('users').where({ id }).first();
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};

export default configurePassport;
