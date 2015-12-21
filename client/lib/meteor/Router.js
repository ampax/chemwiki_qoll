var filename='client/lib/meteor/Router.js';

Router.configure({
   layoutTemplate: 'layout'  //can be any template name
});


Router.map(function(){
	this.route('home', {
		template : 'home_page',
		path: '/',
	});


	this.route('homework', {
		template : 'homework',
		path: '/homework',
	});

	this.route('sent', {
		template : 'sent',
		path: '/sent',
	});
});