// Code heavily copy + pasted from 
// https://github.com/jaredhanson/passport-google-oauth/blob/master/examples/oauth2/app.js
// Thank you Mr. Hanson!!

module.exports = function (app, passport) {
	
	var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

	// var clientID     = process.env.GOOGLE_CLIENT_ID;
	// var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete Google profile is
	//   serialized and deserialized.
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});


	// Use the GoogleStrategy within Passport.
	//   Strategies in Passport require a `verify` function, which accept
	//   credentials (in this case, an accessToken, refreshToken, and Google
	//   profile), and invoke a callback with a user object.
	passport.use(new GoogleStrategy({
	    clientID:     '541720896895-lb1i9lmtpkunv8to3o05on3vrgnvv4g2.apps.googleusercontent.com',
	    clientSecret: 'GOul-zgsDifywOBj_yWih1OM',
	    //NOTE :
	    //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
	    //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/ 
	    //then edit your /etc/hosts local file to point on your private IP. 
	    //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
	    //if you use it.
	    callbackURL: "https://blooming-taiga-9636.herokuapp.com//auth/google/callback",
	    passReqToCallback   : true
	  },
	  function(request, accessToken, refreshToken, profile, done) {
	    // asynchronous verification, for effect...
	    process.nextTick(function () {
	      
	      // To keep the example simple, the user's Google profile is returned to
	      // represent the logged-in user.  In a typical application, you would want
	      // to associate the Google account with a user record in your database,
	      // and return that user instead.
	      return done(null, profile);
	    });
	  }
	));

};
