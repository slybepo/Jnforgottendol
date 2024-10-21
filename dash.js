const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const axios = require('axios');
require('dotenv').config();

const app = express();

// Discord OAuth2 configuration
passport.use(new DiscordStrategy({
    clientID: secrets.Client,
    clientSecret: secrets.Secret,
    callbackURL: 'http://localhost:3000/callback',
    scope: ['identify', 'guilds']
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Session middleware
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/login', passport.authenticate('discord'));
app.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});

app.get('/dashboard', checkAuth, async (req, res) => {
    const user = req.user;
    const guilds = user.guilds;
    // Filter servers where the bot and user both have admin perms
    const userServers = guilds.filter(g => (g.permissions & 0x8) === 0x8); // Check for ADMINISTRATOR permission
    
    res.json({
        username: user.username,
        id: user.id,
        avatar: user.avatar,
        guilds: userServers
    });
});

// Check if the user is authenticated
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
