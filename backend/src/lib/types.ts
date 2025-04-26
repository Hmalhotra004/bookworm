import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IBook extends Document {
  title: string;
  caption: string;
  rating: number;
  image: string;
  user: IUser["_id"];
}
