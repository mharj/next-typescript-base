import { NextApiRequest, NextApiResponse } from "next";

export type HelloData = {
  text: string;
};

export default (req: NextApiRequest, res: NextApiResponse<HelloData>) => {
  res.status(200).json({ text: "world!" });
};
