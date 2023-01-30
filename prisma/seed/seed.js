const { PrismaClient } = require('@prisma/client');
const { users, notices } = require('./data.js');

let prisma = new PrismaClient();
const load = async () => {
  try {
    await prisma.notice.deleteMany();
    console.log('posts deleted');

    await prisma.user.deleteMany();
    console.log('users deleted');

    await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE notice AUTO_INCREMENT = 1`;

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
