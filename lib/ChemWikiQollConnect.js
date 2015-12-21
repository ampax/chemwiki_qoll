var filename='lib/ChemWikiQollConnect.js';

// http://localhost:3000/auget_chemwiki_server?jsoncallback=jQuery11120987146500730887_1450210994890&tags=mount+rainier&tagmode=any&_=1450210994891

ChemWikiQollConnect = {
	clear_qoll_cookie : function() {
		$.removeCookie('qoll-token', { path: '/' });
		$.removeCookie('qoll-url', { path: '/' });
	},
	auth : function(wikidata) {
		console.log('Executing authorization now ....');
		var qoll_token = $.cookie('qoll-token');
		if(qoll_token) {
			// the token exists in browser cookie, use that to authenticate the user
			console.log('Authenticating the user now ....');
			ChemWikiQollConnect.authenticate();
		} else {
			// the cookie does not exist, send an authorize request to Qoll, authenticate user in Qoll, and set the cookie
			console.log('Authorizing the user now ...');
			ChemWikiQollConnect.authorize(wikidata);
		}
	},
	authenticate : function() {
		console.log('user is authorized and data to authenticate is present ... authenticating now ...');
		var qoll_token = $.cookie('qoll-token');
		var qoll_url = $.cookie('qoll-url');
		$('iframe#qoll_iframe').attr('src', qoll_url+'/auget_chemwiki_login/'+encodeURIComponent(qoll_token));
	},
	authorize : function(wikidata) {
		console.log('No data present in Chemwiki ... authorizing the user full on now ...');
		(function() {
			var qollAPI = wikidata.url + "/auget_chemwiki_server?format=json";//&jsoncallback=?
			var request = $.getJSON( qollAPI, {
			  	service : 'chemwiki',
				appId: "98769uyiyohj9876986_jhgfjkg21222.apps.chemwiki.com",
				secret: "1QYX4loolOoV-mzm_80p9JX4_ChemWiki",

			  	// user information
			  	user_f_name : wikidata.user_f_name,
			  	user_l_name : wikidata.user_l_name,
			  	user_name 	: wikidata.user_name,
			  	gender 		: wikidata.gender,
			  	emailId 	: wikidata.emailId,

			  	async: false,
			  	//jsonpCallback: 'JSON.parse',
			  	dataType : 'json',
			    //'Access-Control-Allow-Origin' : '*',
			    //headers: { 'Access-Control-Allow-Origin' : '*',},
			  },
			  function(data, result){
			  	console.log('=====================');
			  	// perform a fun on result
			  	console.log('=====================');
			  })
		    .done(function( data ) {
		    	// perform a fun on done
		    })
		    .always(function(data) {
			    // always perform a fun
			});

			request.complete(function(d, status){
				// request complete
			});

			request.error(function(err){
				console.log('Error happened - ', filename);
				console.log(err);
			});

			request.success(function( data, status, jqXHR ) {
				// $("div.qoll-data").append(data).append('------').append(data.token);

				// on success, set cookie and refresh iframe
				$.cookie('qoll-token', data.token);
				$.cookie('qoll-url', wikidata.url);
				// $('iframe#qoll_iframe').attr('src', 'http://localhost:3000/auget_chemwiki_login/'+encodeURIComponent(data.token)+'/'+data.when+'/'+data.uid);
				$('iframe#qoll_iframe').attr('src', wikidata.url+'/auget_chemwiki_login/'+encodeURIComponent(data.token));

				console.log('Recieved response from qoll - ' + JSON.stringify(status), filename);
				console.log('------------->>>>>>>>>> '+JSON.stringify(jqXHR), filename);
			});


			})();
	},
};


