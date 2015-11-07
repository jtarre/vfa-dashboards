

module.exports = function(app, passport) {

	// =============
	// LOGOUT
	// =============
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	// ===============
	// GOOGLE ROUTES 
	// ===============
	// route for google authentication and login
	app.get('/auth/google', 
		passport.authenticate('google', 
			{ scope : ['https://www.googleapis.com/auth/plus.login',
		'https://www.googleapis.com/auth/plus.profile.emails.read']}));

	// handle the callback after google has authenticated the user
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/',
			failureRedirect : '/companies'
		}));
};