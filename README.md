# Instructions

## Setting up MySQL connection
Open terminal or SQL client and login to MySQL
```bash 
mysql -u your_username -p
```
Run following command to load data into movies database
```bash 
SOURCE /full/path/to/sql/create.sql;
SOURCE /full/path/to/sql/load.sql;
```
* this only works if adding from command line; for something like DBeaver or Workbench, you have to add manually and execute

## Setting up Express server
cd into server directory and run 
```bash 
npm install 
npm install express mysql2 cors dotenv (manually installing; only in case npm install doesn't work)
```
Create .env in server directory (touch .env) and add following info
```bash 
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=movies
```
Add .env in .gitignore

## Running server
Run following command and go to http://localhost:3001/actors or http://localhost:3001/movies
```bash
node server.js
```

So far GET /actors and GET /movies queries for actors and movies is done, still need to write the rest and integrate SQL into HTML code.

## Create branches
Start from main branch at root of directory
```bash 
git checkout main 
git pull origin main
``` 
Create new branch for feature
```bash 
git checkout -b add_review_route (example)
```
Make changes and commit/push
```
git add .
git commit -m "description"
git push origin add_review_route
``` 
Submit PR