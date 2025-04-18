const express = require('express');
const passport = require('passport');
const session = require('express-session');
const fs = require('fs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Load client secret file
const clientSecret = JSON.parse(fs.readFileSync('client_secret.json', 'utf8'));

const app = express();

// Configure session middleware
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: clientSecret.web.client_id,
            clientSecret: clientSecret.web.client_secret,
            callbackURL: clientSecret.web.redirect_uris[0], // Use the first redirect URI
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('Google Profile:', profile);
            return done(null, profile);
        }
    )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Google OAuth Example</h1><a href="/auth/google">Login with Google</a>');
});

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.send('<h1>Login Successful</h1><a href="/logout">Logout</a>');
    }
);

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));