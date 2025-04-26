import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import Book from "../models/Book";

export const addBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save();

    res.status(200).json(newBook);
  } catch (err) {
    console.log("ERROR_ADD_BOOK " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};
