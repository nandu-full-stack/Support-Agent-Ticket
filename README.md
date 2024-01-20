In backend -> just run npm start and open (localhost 5000) then we can see our app is runnning on localhost 


-> you will landed on Create Agent Page 
-> you will have Create Ticket Button on right corner 
-> on clikcing it we will redirected to CreateTicket Page

To check backend server with postman API/Thunder Client 

**FOR ADDING TICKET**
[Post] http://localhost:5000/api/support-tickets

//no validation checks as ticket doesnot requires validation checks
//ticket will be assigned as round robin logic
body -> json 
{
  "topic":"Issue in Ticket 2",
  "description":"Not assigned",
  "severity":"Medium",
  "type":"Ticket"
}



**FOR ADDING AGENT**
[Post] http://localhost:5000/api/support-agents

//validation checks
-> name,email,phone number required
->phone number should be number and with 10 digits and unique
->email should be unique and should have @

body -> json
{
  "name":"Agent2234",
  "email":"Agent21235@email.com",
  "phoneNumber":1234567889,
  "description":"10 Agent "
}


**FOR GETTING TICKETS**

[Get]  http://localhost:5000/api/support-tickets?type=API Calls
**here we can filter our gettting response by `TYPE` or `SEVERITY` or `ASSIGNEDTO`**

->response will be filtered data

`Exposed MongoURL in nodejs for testing by evaluator`

![Screenshot 2024-01-20 121019](https://github.com/nandu-full-stack/Support-Agent-Ticket/assets/143785288/5f57cda8-4f60-407f-91e8-ead3b0573765)
![Screenshot 2024-01-20 121059](https://github.com/nandu-full-stack/Support-Agent-Ticket/assets/143785288/e2adc614-d995-4fcf-bb85-56d94547c6ad)
