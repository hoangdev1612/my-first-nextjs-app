import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split(" ")[1] as string;

  const payload = (await jwt.decode(token)) as { email: string };
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      email: true,
      city: true,
      phone: true,
      first_name: true,
      last_name: true,
    },
  });
  return res.status(200).json({ user: userWithEmail });
};

export default handler;
