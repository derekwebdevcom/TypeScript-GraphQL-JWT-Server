import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorizonation = context.req.headers["authorization"];

  if (!authorizonation) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorizonation?.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not Authenticated");
  }

  return next();
};
