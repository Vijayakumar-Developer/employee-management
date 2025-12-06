Employee Management — Full-Stack CRUD Application

Angular 17 (standalone) + Spring Boot 3 + PostgreSQL

This project is a fully working Employee Management CRUD application built using:

🖥️ Frontend

Angular 17 (standalone components)

Reactive Forms

HttpClient

PrimeNG or custom UI (optional)

🛠️ Backend

Spring Boot 3.x

Spring Data JPA

REST API

PostgreSQL

Maven

📁 Project Structure
employee-management/
│
├── employee-crud-backend/     # Spring Boot Application
│   ├── src/main/java/com.example.employee
│   ├── src/main/resources
│   └── pom.xml
│
└── employee-crud-frontend/    # Angular 17 Application
    ├── src/
    ├── angular.json
    └── package.json

🚀 How to Run the Application
1️⃣ Start PostgreSQL

Create Database:

CREATE DATABASE employee_db;


Update application.properties if needed:

spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

2️⃣ Run the Spring Boot Backend

In terminal:

cd employee-crud-backend
mvn spring-boot:run


Backend Runs On:

👉 http://localhost:8080
👉 APIs start with: /api/employees

Example Endpoints:
Method	Endpoint	Description
GET	/api/employees	Get all employees
POST	/api/employees	Create new employee
GET	/api/employees/{id}	Get by ID
PUT	/api/employees/{id}	Update employee
DELETE	/api/employees/{id}	Delete employee
3️⃣ Run the Angular Frontend
cd employee-crud-frontend
npm install
ng serve


Frontend Runs On:

👉 http://localhost:4200/

📸 Features

✔ Create Employee
✔ Update Employee
✔ Delete Employee
✔ List Employees
✔ Form Validation
✔ Spring Boot REST backend
✔ PostgreSQL persistence

🛠️ Tech Stack Summary
Layer	Technology
Frontend	Angular 17, TypeScript, Reactive Forms
Backend	Spring Boot 3, JPA, REST
Database	PostgreSQL
Build Tools	Maven & npm
Others	DTO, Exception Handling
📂 Future Enhancements

✨ JWT Authentication
✨ Role-based Authorization
✨ Pagination & Search
✨ Docker-compose full-stack deployment

🤝 Contributing

Pull Requests are welcome. For major changes, open an issue first.

📄 License

This project is open-source and free to use.

🎉 Thank You!

If this project helped you, please ⭐ the repository!
