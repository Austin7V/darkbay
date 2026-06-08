## DarkBay Auction API

DarkBay is a RESTful auction platform built with NestJS, TypeORM, SQLite, JWT Authentication, and Swagger. Users can create auctions, place offers, and compete in real-time bidding while the API enforces business rules and authentication.

## Features

Authentication

* User registration
* Secure password hashing with bcrypt
* JWT-based authentication
* Protected routes using NestJS Guards

Auctions

* Create auctions
* Retrieve all auctions
* Retrieve a specific auction
* Automatic default end date (3 days after creation)
* Pagination support
* Filtering by status (open/closed)
* Filtering by price range
* Sorting by end date

Offers

* Place offers on auctions
* Retrieve auction offer history
* Automatic current price updates
* Offer validation rules

Business Rules

* Auctions must be open to accept offers
* Offers must be higher than the current price
* Sellers cannot bid on their own auctions
* Seller identity is derived from JWT
* Bidder identity is derived from JWT

API Documentation

* Interactive Swagger UI
* JWT authentication support inside Swagger
* Request examples and endpoint descriptions


## Tech Stack

* NestJS
* TypeScript
* TypeORM
* SQLite
* Passport JWT
* bcrypt
* class-validator
* Swagger / OpenAPI


## Project Structure
```
src/
├── auth/
├── auctions/
├── offers/
├── users/
├── app.module.ts
└── main.ts
```


## Installation

Clone the repository:

```
git clone <repository-url>
cd darkbay
```

Install dependencies:
```
npm install
```
Create a .env file:
```
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```
Start the development server:
```
npm run start:dev
```


## API Documentation

After starting the application, open:
```
http://localhost:3000/api
```
Swagger provides interactive API documentation and allows testing authenticated endpoints directly from the browser.



## Authentication Flow

Register
```
POST /auth/register
````
```
{
  "username": "sergey",
  "password": "123456"
}
```
Login
```
POST /auth/login
```
```
{
  "username": "sergey",
  "password": "123456"
}
```
Response:
```
{
  "access_token": "jwt-token"
}
```
Use the token in authenticated requests:
```
Authorization: Bearer <access_token>
```


## Example Auction Creation
```
POST /auctions
```
```
{
  "title": "Gaming Laptop",
  "description": "Used but fully functional laptop",
  "startingPrice": 500
}
```


## Example Offer Creation
```
POST /auctions/{auctionId}/offers
```
```
{
  "amount": 600
}
```


## Validation

The API validates incoming requests using NestJS ValidationPipe and class-validator.

Examples:

* Missing required fields → 400 Bad Request
* Invalid data types → 400 Bad Request
* Extra properties → 400 Bad Request

