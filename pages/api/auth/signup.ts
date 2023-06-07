import { NextApiRequest, NextApiResponse } from "next";

const handlerSignup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const body = req.body;
  res.status(200).json(body);
};

export default handlerSignup;
