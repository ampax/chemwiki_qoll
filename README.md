#Chemwiki and Qoll integration Single Sign On solution guide

This is a sample project to show how an external website like Chemwiki can signin it's users into Qoll system using SSO and be able to embed various functional pages of the website in it.

###How SSO works?

The logic to SSO connection is in file lib/ChemWikiQollConnect.js. Chemwiki is assigned an appId and a secret pass-phrase. In future, we will have a system where you will be able to manage these online and be able to change these as and when you want. For now, we will keep it embeded in the file and keep it safe like that.

Qoll requires the following information for a user to SSO register - 

- User First Name
- User Last Name
- User Name
- Gender
- Email ID
- URL of Qoll website you are connecting to (We need this to run in staging mode in future to release new code)

When a user logs into Chemwiki, make the following call on page-load - 
```
	ChemWikiQollConnect.auth(
			{url : 'http://www.localhost:3000', 
			user_f_name : 'Anoop',
			user_l_name : 'Kaushik',
			user_name 	: 'akaushik',
			gender 		: 'male',
			emailId : 'akaushik@gmail.com'});
	}
```

Underneath, auth method works as authenticator and authorizor both -

- The code first checks if user's browser has two cookies set - (1) qoll-token & (2) qoll-url. If it has, then the user is already authorized to start accessing Qoll system. Second step to this, it authenticates the user and logs the user in. From this point onwards, all the Qoll pages embeded in Chemwiki will show users data.
- If the cookies are not present, the code sends Qoll a request, with necessary user's information, to create the account or retrieve the token for already exisitng one.

I have added a ChemWikiQollConnect.clear_qoll_cookie() method to clear the cookies. You can call upon this when a Qoll Chemwiki users logs out of the system.

###Embed various Qoll pages into Chemwiki now

######Embed the whole Qoll website like the following - 
```
<iframe src="http://localhost:3000/" height="1000" width="100%" id="qoll_iframe"></iframe>
```

######Embed Homework page of Qoll into Chemwiki like the following - 
```
<iframe src="http://localhost:3000/inbox_chemwiki" height="1000" width="100%" id="qoll_iframe"></iframe>
```

######Embed Sent page of Qoll into Chemwiki like the following - 
```
<iframe src="http://localhost:3000/sent_chemwiki" height="1000" width="100%" id="qoll_iframe"></iframe>
```
