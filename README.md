# Burger King Food Delivery App

A full-stack food delivery application inspired by Burger King, featuring user authentication, product browsing, cart management, order processing, and admin functionality.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Product Catalog**: Browse menu items with categories (Veg, Non-Veg, Snacks, Desserts, Cold Drinks, BK Cafe)
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Place orders and track order history
- **Admin Panel**: Manage products, view orders, and handle administrative tasks
- **Responsive Design**: Mobile-friendly interface built with Angular
- **Secure API**: RESTful backend with authentication interceptors

## Tech Stack

### Frontend
- **Angular 19**: Framework for building the user interface
- **TypeScript**: Programming language
- **FontAwesome**: Icons for UI elements
- **RxJS**: Reactive programming library

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **Multer**: File upload handling
- **Nodemailer**: Email services
- **Passport.js**: Authentication middleware

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Angular CLI (for development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-delivery
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/burger-king-db
   JWT_SECRET=your-jwt-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev  # For development with nodemon
   # or
   npm start    # For production
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend Application**
   ```bash
   cd client
   npm start
   ```
   The Angular app will run on `http://localhost:4200`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:4200`
   - Admin features are available through specific routes

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/food` - Get all food items
- `POST /api/food` - Add new food item (Admin)
- `PUT /api/food/:id` - Update food item (Admin)
- `DELETE /api/food/:id` - Delete food item (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Place new order

### Admin
- `GET /api/admin/orders` - Get all orders (Admin)
- `GET /api/admin/users` - Get all users (Admin)

## Project Structure

```
food-delivery/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── common/     # Shared components and services
│   │   │   ├── interceptors/
│   │   │   └── ...
│   │   └── assets/
│   └── ...
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   └── ...
│   └── server.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.