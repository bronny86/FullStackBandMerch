# FullStackBandMerch

# MerchStand API Documentation

MerchStand is a full-stack web application that enables independent bands to create custom merchandise (t-shirts). The back-end API is built using Node.js, Express, and MongoDB, and supports robust CRUD operations, advanced filtering/sorting, pagination, JWT authentication, role-based access control (RBAC), and aggregation endpoints.

---

## Technologies Used

### Server & Framework

- **Node.js & Express:**  
  Provides a fast, scalable, and lightweight server environment along with a minimalistic routing framework.

### Database & ODM

- **MongoDB & Mongoose:**  
  A NoSQL document-oriented database that offers flexible data schemas. Mongoose is used for schema definitions and database interactions.

### Authentication & Security

- **JWT (JSON Web Tokens):**  
  Enables stateless, scalable authentication.
- **bcrypt:**  
  Used to securely hash and compare user passwords.
- **Helmet & CORS:**  
  Helmet sets various HTTP headers for enhanced security, while CORS allows controlled cross-origin resource sharing.

### Testing & Linting

- **Jest & Supertest:**  
  Provides a comprehensive testing framework for unit and integration tests.
- **ESLint (Airbnb Style Guide):**  
  Enforces consistent coding standards and best practices.

---

## Dependent Software and Packages

- **Node.js (v16+ recommended)**
- **MongoDB:**  
  Can be run locally (Community Edition) or through managed services like MongoDB Atlas.
- **NPM/Yarn:**  
  For package management.
- **Packages:**  
  Express, Mongoose, bcrypt, jsonwebtoken, helmet, cors, dotenv, jest, supertest, eslint, etc.

---

## Hardware Requirements

- **Processor:**  
  Modern multi-core CPU (minimum 2 cores recommended).
- **Memory:**  
  At least 4GB of RAM.
- **Storage:**  
  Approximately 500MB or more free space (depending on data volume).

---

## Comparisons to Alternative Technology Choices

- **Express vs. Other Frameworks:**  
  Express is chosen for its simplicity and extensive community support, compared to alternatives like Koa, Hapi, or NestJS.
- **MongoDB vs. Relational Databases:**  
  MongoDB offers schema flexibility and scalability for document-oriented data, whereas relational databases (e.g., PostgreSQL, MySQL) require fixed schemas.
- **JWT vs. Session-based Authentication:**  
  JWT supports stateless authentication, improving scalability compared to server-side session storage.
- **ESLint (Airbnb Style Guide) vs. Other Style Guides:**  
  The Airbnb style guide is widely recognized for enforcing clean, maintainable code.

---

## Purpose of Chosen Technologies

- **Node.js & Express:**  
  Provide a high-performance, scalable server environment.
- **MongoDB & Mongoose:**  
  Allow flexible, schema-less data storage with robust query capabilities.
- **JWT & bcrypt:**  
  Ensure secure, stateless authentication and proper password management.
- **Helmet & CORS:**  
  Enhance security by protecting against common vulnerabilities and controlling resource sharing.
- **Jest & Supertest:**  
  Ensure application reliability through comprehensive testing.
- **ESLint with Airbnb:**  
  Maintains a consistent code style and enforces best practices.

---

## Licensing

- **Project License:**  
  This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
- **Dependencies:**  
  Individual packages (e.g., Express, Mongoose, bcrypt) are subject to their own licenses (mostly MIT or Apache 2.0), which are compatible with the overall MIT license for the project.

---

## Style Guide

- **Coding Standards:**  
  The project follows the Airbnb JavaScript Style Guide.
- **Linting:**  
  ESLint is configured to enforce the Airbnb ruleset, ensuring consistency, readability, and maintainability.
- **Best Practices:**  
  Utilizes modern JavaScript (ES6+) with a focus on modularity, DRY principles, and robust error handling.

---


Admin Section

The Admin section of the application provides a powerful interface for managing the core functionalities of the platform. Admin users can manage orders, stock, clipart, fonts, designs, and payments directly from a centralized dashboard. This section is designed to provide an easy-to-use interface for handling and maintaining all backend operations of the application.
Features of the Admin Section:

    Admin Dashboard:

        Provides an overview of all admin pages and quick access to manage orders, stock, clipart, fonts, designs, and payments.

        A simple and intuitive layout to navigate between different sections.

    Admin Orders:

        Allows the admin to view and manage customer orders.

        Features to update the status of orders (e.g., Pending, Paid, Shipped, Cancelled).

        Soft delete functionality to delete orders with a deletion reason, which can be tracked.

    Admin Stock:

        Allows the admin to manage stock items, including creating new stock, updating stock details (such as color, size, material, price, etc.), and deleting stock items.

        The stock table includes sorting and filtering options, making it easy to manage a large inventory of items.

    Admin Clipart:

        Admins can manage available clipart items used for custom designs.

        Allows adding, editing, and deleting clipart items.

        Includes a table to view all available clipart items with the option to delete or update.

    Admin Fonts:

        Admins can manage the fonts available for custom T-shirt designs.

        Similar to clipart, admins can add, edit, and delete fonts that will be available to users for custom designs.

    Admin Designs:

        Admins can manage custom designs submitted by users or created by the admin.

        Admins can view and delete designs, with options to add new designs if needed.

    Admin Payments:

        Admins can view all payments made through the platform.

        Includes filtering, sorting, and pagination to handle a large number of payment records.

        Payment details are displayed, including the payment method, last four digits, transaction ID, and status.

        Admins can also soft delete payments with a required reason for deletion.

Common Functionalities Across All Admin Pages:

    CRUD Operations: All admin pages support full CRUD (Create, Read, Update, Delete) operations for managing the respective data.

    Search and Filter: Users can filter records by specific criteria (e.g., order date, price, stock availability) to easily manage the data.

    Responsive Design: The Admin section is designed to be fully responsive, ensuring that the admin pages work seamlessly across desktop and mobile devices.

    Data Validation: Proper validation is performed for each input field, ensuring that data entered by the admin is consistent and error-free.

    Error Handling: All admin pages are equipped with error handling to gracefully manage failed operations (e.g., failed data fetching, invalid input).

    Confirmation Modals: For sensitive actions like deleting records, a confirmation modal is used to ensure that actions are intentional and help prevent accidental data loss.

Technologies Used:

    Frontend: React.js, Styled Components for UI styling, React Router for navigation, Axios for making API requests.

    Backend: Node.js, Express.js for API routes, MongoDB for data storage.

    Libraries and Tools:

        React Router for page navigation.

        Axios for making HTTP requests to the backend API.

        Styled Components for reusable and consistent styling across admin pages.

Future Features:

    Profanity Filter: A profanity filter for text input in custom designs to ensure that offensive language is not used.

    Preview Window: A live preview window to visualize custom designs as they are created, allowing users to see their designs before submitting them.

How to Access the Admin Section:

    Login as an Admin: Only users with admin privileges can access this section.

    Admin Routes: Admin routes are prefixed with /admin/, followed by specific sections like orders, stock, clipart, fonts, designs, and payments.