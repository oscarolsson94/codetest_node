How to get the app up and running:

1. Clone the repository.

2. Make sure you have Node and MongoDB installed and running on your machine.

3. Navigate to the main folder of the project and run the command "npm install" to get all the modules.

4. To start the app, run the command "node index.js" while in the main project folder.

5. The app is now running.

6. To manually update the post with userId=1 and id=2 in the DB, send a PATCH-request to "http://localhost:5000/api/posts/1/2".

7. The body of the request should include either title, body or both. For example:

{
"title": "TestTitle",
"body: "Some random text"
}
