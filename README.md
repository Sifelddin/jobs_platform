This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

install the dependencies for this project:
 ```bash
 npm install
 # or
 yarn
 ```
it should add **.env** file, else you can create **.env.local** in the root directory.

### in .env file add these variables :

DATABASE_URL => database credentials
exemple : "mysql://root:password@localhost:3306/jobs"

if you want to use database rather than mysql DB, you must change it also in **prisma/schema.prisma** file

NEXT_PUBLIC_HOST="http://localhost:3000" <br />
NEXTAUTH_URL="http://localhost:3000/" <br />
NEXTAUTH_SECRET="random value"

### seed
 ```bash
 npm run seed
 ```

### run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


