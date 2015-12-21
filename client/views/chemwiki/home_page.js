var filename='client/views/chemwiki/home_page.js';

Template.home_page.events({
	'click .qoll-connect' : function() {
		console.log('Clicked to connect to the qoll ... will run the code to connect now');

		ChemWikiQollConnect.auth(
			{url : 'http://www.localhost:3000', 
			user_f_name : 'Anoop',
			user_l_name : 'Kaushik',
			user_name 	: 'akaushik',
			gender 		: 'male',
			emailId : 'akaushik@gmail.com'});

		// ChemWikiQollConnect.authorize('ChemWikiSecret-XXXXXXXX');
	}
});