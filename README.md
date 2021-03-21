# fetch-take-home

## Description 
Take home assignment for fetch rewards. The program is run locally through port 5000, but it can change if necessary. 

## Requirements

 - [Git](https://git-scm.com/downloads)
 - [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [Postman](https://www.postman.com/downloads/) (optional) 
	 - Makes it easy to make requests to the server and add the appropriate request headers 

## Start instructions

 - Clone the repository with "git clone (repository url, no parenthesis)" 
 - Navigate to the folder in your terminal and put 
	> npm install    
	> 
	to install the required packages 
-	Launch the server by putting this in your terminal 
	> node app
	> 
	or 
	> nodemon app 
	> 
- 	Make the requests to the local URL. By default, the requests will be made to http://localhost:5000

## URL Endpoints and Route methods 
Append these endpoints to the URL and make requests from there
EX - To call the /balance route, you make a GET request to http://localhost:5000/balance    
 - > /balance
	 - REQUIRED HEADERS: None
	 - REQUEST TYPE: GET
	 - DESCRIPTION: This returns the current balance list 
 - > /transaction
	 - REQUIRED HEADERS: None
	 - REQUEST TYPE: GET
	 - DESCRIPTION: This returns the unsorted transaction list 
 - > /transaction/sort
     - REQUIRED HEADERS: None
	 - REQUEST TYPE: GET
	 - DESCRIPTION: This returns the sorted transaction list 
 - > /transaction/add
	 - REQUIRED HEADERS: None
	 - REQUEST TYPE: GET
	 - DESCRIPTION: This returns a message telling the user that they need to make a POST request to this route because it modifies the current transaction list. 
 - > /transaction/add
	 - REQUIRED HEADERS: 
		 - payer - A string that identifies the current payer 
		 - points - An integer that holds the point balance for the payer
		 - timestamp (optional) - Not required, but if one is passed, it must be passed by ISOString().  If it's not passed, an ISOString() timestamp will be generated
	 - REQUEST TYPE: POST
	 - DESCRIPTION: Adds a transaction to the transaction list 
 - > /points/spend
	 - REQUIRED HEADERS: None
	 - REQUEST TYPE: GET
	 - DESCRIPTION: This returns a message telling the user that they must make a POST request to this route because this modifies the balance and transaction sheets. 
 - > /points/spend
	 - REQUIRED HEADERS: 
		 - points - An integer that holds the number of points to spend
	 - REQUEST TYPE: POST
	 - DESCRIPTION: Spends points specified by the points header, ensuring that no user's point balance goes negative from this request. If successful, the current balance list will be returned. If unsuccessful, an error message will be returned. 
