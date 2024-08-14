# Organic E-commerce Shop

Welcome to my Organic E-commerce Shop project! This project is a practical work project developed using Angular, TypeScript, and Firebase. Project is a work in progress, and while it's functional in its current state, there are plans to enhance and expand its features.

## Features

- User authentication:
  - Users can sign up with an email and generate a password.
  - For the demo user can also login with email user@gmail.com and password [userUser].
  - For demonstration purposes all the users can edit and create prooducts, but changes won't be saved in the database.
- Product Management:
  - Admin user can add, update, and delete products from the Firebase database.
  - Products have title, price, category and image URL.
- Filtering:
  - In the home page products can be filtered by the categories.  
- Shopping Cart:
  - Users can add products to their shopping cart.
  - Users can remove products from the shopping cart.
  - Shopping cart calculates the total price of the cart.
  - User can see how many products user have in shopping cart from the home page. All the changes updates in realtime (if you can't see the updates realtime try to refresh the page).
  - User can change the quantity of the products also from the shopping cart.
  - User can remove all the products from the shopping cart.


## Upcoming Features

I have plans to improve and extend the project with the following features:

- Checkout and Order Management:
  - Implement a checkout process for users to place orders.
  - Create a page for users and admins to manage orders.
- Testing:
  - Implement unit and integration tests to ensure the application's reliability.
 

## Hosting

This project is also hosted on Firebase Hosting and can be accessed at the following URL: https://oshop-ec4f0.web.app.


## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

```bash
   git clone https://github.com/ilpop/organic_shop.git
```

Install the required dependencies:

```bash
cd organic-e-commerce-shop
```
```bash
npm install
```

Set up Firebase:

    Create a Firebase project and set up Firebase Authentication and Firestore as needed.
    Configure your Firebase credentials in the project.

Start the development server:

```bash
    ng serve
```

    Open your browser and navigate to http://localhost:4200/ to access the application.


## Contact

If you have any questions or suggestions, feel free to reach out:

    Ilkka Ihalainen
    Email: ilkka.ihalainen@tuni.fi
    GitHub: https://github.com/ilpop
