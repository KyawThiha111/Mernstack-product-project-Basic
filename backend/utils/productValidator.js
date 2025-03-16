import { body, query } from "express-validator";
export const AddPostRouteValidator = [
  body("productname")
    .notEmpty()
    .withMessage("Product Name is required!")
    .isString()
    .withMessage("Product Name has to be a string!"),
  body("price")
    .notEmpty()
    .withMessage("Price is required!")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("photo")
    .notEmpty()
    .withMessage("Provide a URL for the photo")
    .isURL()
    .withMessage("Phto has to be a URL."),
];

export const FindWithQueryValidator = [
  query("filterkey")
  .isString()
  .withMessage("Filter Key must be a string!")
  .notEmpty()
  .withMessage("Filter key must be be empty."),
  query("value")
  .isString()
  .withMessage("Value must be a string!")
  .notEmpty()
  .withMessage("Value key must be be empty.")
];
