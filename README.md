# User Form Web Application

## Objective
The objective of this project was to create a small web application to test and try out some new concepts and technologies, including High Order Components, i18n (internationalization), and creating a simple backend environment.

## Functionalities
- Add user information
- View previous user information
- View all previous users
- Change language between Portuguese and English

## Stack
- Typescript + ReactJS (frontend)
- NodeJS + MySQL (backend)
- Hooks (useState, useEffect)
- Redux (simple version)
- React Router
- i18n for translations
- High Order Component to protect routes

## Database Setup
### Database Name: ff_db

#### Users Table
```sql
CREATE TABLE ff_db.users (
  id VARCHAR(45) NOT NULL,
  name VARCHAR(45) NULL,
  surname VARCHAR(45) NULL,
  countryId INT NULL,
  birthday VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
);
```
#### Countries Table
```sql
CREATE TABLE ff_db.countries (
  id INT NOT NULL,
  en VARCHAR(45) NULL,
  pt VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
);
```
#### Foreign Key Constraint
```sql
ALTER TABLE ff_db.users 
ADD INDEX countryId_idx (countryId ASC) VISIBLE;

ALTER TABLE ff_db.users 
ADD CONSTRAINT countryId
  FOREIGN KEY (countryId)
  REFERENCES ff_db.countries (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```
#### Sample Data
```sql
INSERT INTO ff_db.countries (id, en, pt) VALUES (1, 'Portugal', 'Portugal');
INSERT INTO ff_db.countries (id, en, pt) VALUES (2, 'Spain', 'Espanha');
INSERT INTO ff_db.countries (id, en, pt) VALUES (3, 'United Kingdom', 'Reino Unido');
```

## Getting Started
1. Clone the repository.
2. Install dependencies using `npm install` for both backend and frontend.
3. Configure your MySQL database.
4. Run the backend server using `node index.js`.
5. Run the frontend application using `npm start`.

## Contributors

This project was developed by Filipe Faustino.
