import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

const prisma = new PrismaClient();
const handlerSignin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    const test = await prisma.$queryRaw`select * from public.user`;
    return res.status(405).json({ message: test });
  }
  const { email, password } = req.body;
  const errors: any[] = [];
  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is not valid",
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: "Password is invalid",
    },
  ];
  validationSchema.forEach((item) => {
    if (!item.valid) {
      errors.push(item.errorMessage);
    }
  });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userWithEmail) {
    return res.status(401).json({ message: "Email or password is incorrect" });
  }
  const isMatch = bcrypt.compareSync(password, userWithEmail.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Email or password is incorrect" });
  }
  const algorithm = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({
    email: userWithEmail.email,
  })
    .setExpirationTime("2h")
    .setProtectedHeader({ alg: algorithm, typ: "JWT" })
    .sign(secret);
  return res.status(200).json({ token: jwt });
};

export default handlerSignin;
