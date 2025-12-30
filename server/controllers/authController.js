import passport from 'passport';

export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message || 'Login failed' });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Logged in', user: { id: user.id, username: user.username } });
        });
    })(req, res, next);
};

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Logged out' });
    });
};

export const getMe = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ id: req.user.id, username: req.user.username });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
};
