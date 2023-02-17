const { PrismaClient } = require('@prisma/client');
const { users, notices } = require('./data.js');
const bcrypt = require('bcrypt');
let prisma = new PrismaClient();
const load = async () => {
  try {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      user.password = await bcrypt.hash(user.password, 10);
    }

    await prisma.application.deleteMany();
    console.log('applications deleted');
    await prisma.notice.deleteMany();
    console.log('posts deleted');

    await prisma.user.deleteMany();
    console.log('users deleted');

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE Notice AUTO_INCREMENT = 1`;
    console.log(users);
    await prisma.user.createMany({
      data: users,
    });
    console.log('users created');
    await prisma.notice.createMany({
      data: notices,
    });
    console.log('notices created');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
