var filename='lib/ChemWikiQollConnect.js';

// http://localhost:3000/auget_chemwiki_server?jsoncallback=jQuery11120987146500730887_1450210994890&tags=mount+rainier&tagmode=any&_=1450210994891

var url = 'http://localhost:3000/auget_chemwiki_server';

ChemWikiQollConnect = {
	authorize : function(secret) {
		(function() {
			var qollAPI = "http://www.localhost:3000/auget_chemwiki_server?format=json";//&jsoncallback=?
			var request = $.getJSON( qollAPI, {
			  	service : 'chemwiki',
				appId: "98769uyiyohj9876986_jhgfjkg21222.apps.chemwiki.com",
				secret: "1QYX4loolOoV-mzm_80p9JX4_ChemWiki",

			  	// user information
			  	user_f_name : 'Anoop',
			  	user_l_name : 'Kaushik',
			  	user_name 	: 'akaushik',
			  	gender 		: 'male',
			  	emailId : 'akaushik@gmail.com',

			  	async: false,
			  	//jsonpCallback: 'JSON.parse',
			  	dataType : 'json',
			    //'Access-Control-Allow-Origin' : '*',
			    //headers: { 'Access-Control-Allow-Origin' : '*',},
			  },
			  function(data, result){
			  	console.log('=====================');
			  	console.log(JSON.stringify(data));
			  	console.log(JSON.stringify(result));
			  	$("div.qoll-data").append(JSON.stringify(data));
			  	console.log('=====================');
			  })
		    .done(function( data ) {
		    	$("div.qoll-data").append(data);
		    })
		    .always(function(data) {
			    console.log( "complete - " + JSON.stringify(data) );
			    $("div.qoll-data").append(data);
			});

			request.complete(function(d, status){
				console.log('Complete the request and got the data - ' + JSON.stringify(d) + '/' + status, filename);
			});

			request.error(function(err){
				console.log('Error happened - ', filename);
				console.log(err);
			});

			request.success(function( data, status, jqXHR ) {
				$("div.qoll-data").append(data).append('------').append(data.token);

				$('iframe#qoll_iframe').attr('src', 'http://localhost:3000/auget_chemwiki_login/'+encodeURIComponent(data.token)+'/'+data.when+'/'+data.uid);
				// $('iframe#qoll_iframe').attr('src', 'http://localhost:3000/inbox');
				console.log('Recieved response from qoll - ' + JSON.stringify(status), filename);
				console.log('------------->>>>>>>>>> '+JSON.stringify(jqXHR), filename);
			});


			})();
	},
	authorize3 : function(secret) {
		(function() {
			  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
			  $.getJSON( flickerAPI, {
			    tags: "mount rainier",
			    tagmode: "any",
			    format: "json"
			  })
			    .done(function( data ) {
			      $.each( data.items, function( i, item ) {
			        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
			        if ( i === 3 ) {
			          return false;
			        }
			      });
			    });
			})();
	},
	authorize2 : function(secret) {
		alert('Another alerting - ' + secret);
		console.log('Sending the secret token to Qoll to fetch the the cookie and authorize the user xxx ...' + secret, filename);
		var request = $.getJSON("http://localhost:3000/auget_chemwiki_server?format=json&jsoncallback=?",function(result){
	  		console.log(result);

	  		$.each(result, function(i, field){
		    	$("div.qoll-data").append(field + " ");
		    });
			return result;
	    });

	    $("div.qoll-data").append(request.responseText);

	    request.success(function( data, status, jqXHR ) {
		  console.log('Recieved response from qoll - ' + JSON.stringify(data), filename);
		  console.log('Recieved status from qoll - ' + JSON.stringify(status), filename);
		  console.log('------------->>>>>>>>>> '+JSON.stringify(jqXHR), filename);
		});
	},
	authorize1 : function(secret) {
		console.log('Sending the secret token to Qoll to fetch the the cookie and authorize the user xxx ...' + secret, filename);

		var request = $.post({
		  	url: url,
		  	method: "POST",
		  	data: { secret : secret, appId : 'ChemWiki', emailId : 'procrazium@gmail.com' },
		  	dataType: "json",
		  	contentType: 'application/json; charset=utf-8',
		  	headers: { 'Access-Control-Allow-Origin' : 'http://localhost:3000',},
		  	async: true,
		  	beforeSend : function setHeader(xhr) {
				// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
				xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST');
				
			},
			callback : function( data, status, jqXHR ) {
				alert(data);
				alert(jqXHR);
				console.log('------------->>>>>>>>>> '+data);
				console.log('------------->>>>>>>>>> '+JSON.stringify(jqXHR), filename);
			},
			success : function( data, status, jqXHR ) {
				//$( "#log" ).html( msg );
			  	alert('---------------');
			  	console.log('Recieved response from qoll ---------- ' + JSON.stringify(data), filename);
			  	console.log('------------->>>>>>>>>> '+JSON.stringify(jqXHR), filename);
			},
			failure: function(errMsg) {
				alert('Error happened - ' + errMsg);
				console.log('Error happened while getting the data from server - ' + errMsg, filename);
			},
		});
		 
		request.done(function( msg, param ) {
		  //$( "#log" ).html( msg );
		  console.log('Done with the ajax request ' + param, filename);
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		  console.log('Failed to recieve response from qoll - ' + jqXHR);
		  console.log(jqXHR);
		});

		request.success(function( data, status, jqXHR ) {
			$("div.qoll-data").append(data);
		  //$( "#log" ).html( msg );
		  console.log('Recieved response from qoll - ' + JSON.stringify(status), filename);
		  console.log('------------->>>>>>>>>> '+JSON.stringify(jqXHR), filename);
		});
	},
};


