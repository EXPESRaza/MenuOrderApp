# Menu Order App

This application is created with [Create React App](https://github.com/facebook/create-react-app).

## EPIC / Story

Write a React app using Redux (Redux toolkit if you prefer, or any other library) that is a
restaurant menu ordering app. The app simulates the app in a restaurant like Red Robin where
the customer can order by themselves with a tablet.

## Sub-tasks

- Test Swagger Api public methods (**Completed**)
- Create a skeleton app using Create React App (**Completed**)
- Call the get MenuItem api and display a menu to the user (**Completed**)
- Allow the user to select menu items and add them to their order (**Not Started**)
- Allow user to modify their order before submission (remove menu items, increase the
number of specific items, etc) (**Not Started**)
- Display the total cost of the order with each edit (**Not Started**)
- Submit the order to POST Order api and display the order number and item count (**Not Started**)

## Swagger UI Source

https://testmenuorderapi.azurewebsites.net/swagger/index.html

## Issues

- CORS issue while making call to the Swagger API (**Addressed**)
- Duplicate menu items in the api response will probably cause in the Order call

## UI Look-n-Feel

![image](https://github.com/EXPESRaza/MenuOrderApp/assets/19290062/8b34ccff-0480-4275-a28b-37c089208acd)

## References

OpenAI ChatGPT 
https://chat.openai.com/

Google Bard
https://bard.google.com/

CORS Proxies
https://nordicapis.com/10-free-to-use-cors-proxies/

Forward Proxy Server
https://github.com/Freeboard/thingproxy

Headers with axios POST requests
https://stackoverflow.com/questions/44617825/passing-headers-with-axios-post-request
