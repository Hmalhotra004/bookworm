// custom.d.ts
import { IUser } from "./src/lib/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
