# Book-Management-System
Book Management System backend using Express and MongoDB contains various endpoints that will help to manage library users and work with library data. The application will provide an endpoint for user management. API will be able to register users, authenticate users, borrow books, return books, create books, pay fine .

## Prerequisites:
1. Node.js
2. Express.js
3. MongoDB

## Approach to create Library Management Application Backend:
1. I will build an Express server to serve as a backend API.
2. Then, I will configure MongoDB Atlas to store library data.
3. Next, I will set up the server to manage library data using Mongoose.
4. I will implement routes to retrieve users and books from the backend using GET requests.
5. For authentication, I will include login, logout, and session routes that utilize JWT and local Passport authentication.
6. Following that, I will create a route to allow the creation of a new book by receiving book data from the client.
7. Similarly, I will add routes for borrowing and returning books to the library.
8. All the routes mentioned above will utilize HTTP POST requests.
9. Finally, I will implement another POST request for paying fines, which can later be modified to incorporate more complex payment logic as needed.

## Functionalities:
1. **Register User:** Register and save user into collection.
2. **Admin:** Register and save admin information into collection.
3. **Authenticate:** Authenticates user with username and password.
4. **Get Books:** Can View all available books in system.
5. **Get Users:** Can view all available users in system.
6. **Create Book:** creates and save new book in collection.
7. **Borrow book:** Allow user to borrow available book from system.
8. **Return Book:** Allow user to return borrowed book back to system.
9. **Pay fine:** Pay fine if charged for book.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Install All dependencies
#### `npm install`

### To create a environment file
Setup a database and give a scecret key jwt authentication.

### To run a application
#### `npm start`

## List of All API links :
1. http://localhost:5000/
2. http://localhost:5000/register
3. http://localhost:5000/login
4. http://localhost:5000/logout
5. http://localhost:5000/session
6. http://localhost:5000/getdetails
7. http://localhost:5000/getbooks
8. http://localhost:5000/getusers
9. http://localhost:5000/createbook
10. http://localhost:5000/borrowbook
11. http://localhost:5000/returnbook
12. http://localhost:5000/payfine
13. http://localhost:5000/admin/register
14. http://localhost:5000/admin/register

## Output:

https://github.com/aman8440/Book-Management-System/assets/82088006/579911fb-76ba-4859-8824-f61f54993617






