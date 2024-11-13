const passport = require('passport');
const TwitchStrategy = require('passport-twitch-new').Strategy;
const User = require('../models/userModel');

passport.use(new TwitchStrategy({
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: process.env.TWITCH_REDIRECT_URI,
    scope: 'user:read:email',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Access Token: ', accessToken);
        console.log('Refresh Token: ', refreshToken);
        console.log('Profile: ', profile);
        let user = await User.findOne({ twitchId: profile.id });

        if (!user) {
            user = new User({
                twitchId: profile.id,
                username: profile.display_name,
                email: profile.email,
                profilePicture: profile.profile_image_url,
                bio: profile.description,
            });
            await user.save();
        }

        done(null, user);
    } catch (err) {
        console.error('Error during authentication:', err);
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user?.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
