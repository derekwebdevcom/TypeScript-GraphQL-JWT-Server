import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("xid", token, {
    httpOnly: true,
  });
};
