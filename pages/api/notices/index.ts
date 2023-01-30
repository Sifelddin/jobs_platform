import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function categoryHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  let notice = undefined;
  switch (method) {
    case 'GET':
      let notices = await prisma.notice.findMany();
      res.status(200).json(notices);

      break;
    case 'POST':
      try {
        notice = await prisma.notice.create({ data: req.body });
        res.status(201).json(notice);
      } catch (err) {
        res.status(500).json(err);
      }

      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
