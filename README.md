
# To Do LiST

## Running the project

### Running server
1. Be sure you have **docker/docker-compose** and **yarn** (or **npm**, if you use it) installed.
2. Clone the repository by running 
```bash 
git clone 
```
3. Install all the dependencies by running
```bash 
yarn install
# or
npm install
```
4. Create a **.env** file and copy the following content to it:
```dotenv
DATABASE_DB=todo
DATABASE_USER=todo
DATABASE_PASSWORD=todo
DATABASE_PORT=3006
DATABASE_TYPE=mysql
DATABASE_HOST=localhost

DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=secret
```
  
5. To run the development server, run
```bash
docker-compose up
```

6. To run the migrations, run the server as described and on a new terminal, run:
```bash
yarn migration
```

7. Now the server should be running!

### Running Client

1. Open another terminal 

2. Run 

```bash
yarn dev
```
3. Now the frontend should be running!# toDoList
