This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

install the dependencies for this project:
 ```bash
 npm install
 # or
 yarn
 ```
it should add **.env** file, else you can create **.env.local** in the root directory.

### install mysql database

if you have docker install you can use docker-compose file to install **mysql** and **phpmyadmin** containers using this command : 

```bash

docker-compose up 

```

### in .env file add variables :

from the **env.example** file copy all the variables in **.env** file

by default : user : **root** - and password : **example**

### seed
 ```bash
 npx prisma db push
 
 **then**
 
 npm run seed
 ```

### run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


