import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();
passport.use(new GoogleStrategy({
  
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  '/api/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    // profile contient l'email, prénom, etc.
    // Tu peux ici créer l'utilisateur s'il n'existe pas en BDD
    const email = profile.emails[0].value;
    const name = profile.displayName;
    
    // Ici, recherche ou crée ton user en BDD
    const user = { email, name };  // exemple minimal
    done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
