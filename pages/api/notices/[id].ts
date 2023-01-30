import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function categoryHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  let category = undefined;
  switch (req.method) {
    case 'GET':
      category = await prisma.notice.findFirst({
        where: { id: Number(id) },
      });
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).end("category doesn't exist");
      }

      break;
    case 'PUT':
      try {
        category = await prisma.notice.update({
          where: { id: Number(id) },
          data: req.body,
        });
        res.status(201).json(category);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case 'DELETE':
      try {
        category = await prisma.notice.delete({
          where: { id: Number(id) },
        });

        res.status(204).json({ message: 'category deleted successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
