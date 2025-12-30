import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { configurePassport } from './config/passport.js';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    secret: 'spotify-wrapped-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Passport Config
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api', routes);

export default app;
