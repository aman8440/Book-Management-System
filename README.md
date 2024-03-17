# Book-Management-System
Book Management System backend using Express and MongoDB contains various endpoints that will help to manage library users and work with library data. The application will provide an endpoint for user management. API will be able to register users, authenticate users, borrow books, return books, create books, pay fine .

##Prerequisites:
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

## List of All API links :
.. http://localhost:5000/
.. http://localhost:5000/register
.. http://localhost:5000/login
.. http://localhost:5000/logout
.. http://localhost:5000/session
.. http://localhost:5000/getdetails
.. http://localhost:5000/getbooks
.. http://localhost:5000/getusers
.. http://localhost:5000/createbook
.. http://localhost:5000/borrowbook
.. http://localhost:5000/returnbook
.. http://localhost:5000/payfine
.. http://localhost:5000/admin/register
.. http://localhost:5000/admin/register

## Output:

https://github.com/aman8440/Book-Management-System/assets/82088006/579911fb-76ba-4859-8824-f61f54993617






