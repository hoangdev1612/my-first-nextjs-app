import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

const handlerSignup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { firstName, lastName, email, phoneNumber, city, password } = req.body;
  const errors: any[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 1, max: 20 }),
      errorMessage: "First name must be between 1 and 20 characters",
    },
    {
      valid: validator.isLength(lastName, { min: 1, max: 20 }),
      errorMessage: "Last name must be between 1 and 20 characters",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is not valid",
    },
    {
      valid: validator.isMobilePhone(phoneNumber),
      errorMessage: "Phone number is not valid",
    },
    {
      valid: validator.isLength(city, { min: 1, max: 20 }),
      errorMessage: "City must be between 1 and 20 characters",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is not strong",
    },
  ];
  validationSchema.forEach((item) => {
    if (!item.valid) {
      errors.push(item.errorMessage);
    }
  });
  if (errors.length > 0) {
    return res.status(400).json({
      errors: [
        errors.map((item) => {
          return { errorMessage: item };
        }),
      ],
    });
  }
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userWithEmail) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
      email: email,
      phone: phoneNumber,
      city: city,
    },
  });
  const algorithm = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({
    email: user.email,
  })
    .setProtectedHeader({ alg: algorithm })
    .setExpirationTime("2h")
    .sign(secret);
  setCookie("jwt", token, {
    req,
    res,
    maxAge: 2 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
  });
  res.status(200).json({ token: token });
};

export default handlerSignup;
