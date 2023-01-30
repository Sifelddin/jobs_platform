// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import nc from 'next-connect';
import multer from 'multer';
import { randomUUID } from 'crypto';

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: async (req, file, cb) => {
      try {
        let res = await prisma.application.create({
          data: {
            CVpath: '/uploads/' + randomUUID().concat('_' + file.originalname),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            noticeId: Number(req.body.noticeId),
          },
        });
        cb(null, randomUUID().concat('_' + file.originalname));
      } catch (e) {
        console.log(e);
      }
    },
  }),
});
const uploadMiddleware = upload.array('cv');

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
})
  .use(uploadMiddleware)

  .post((req, res) => {
    res.status(200).json({ data: 'success' });
  });
export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
