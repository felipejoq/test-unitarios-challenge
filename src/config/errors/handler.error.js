import { CustomError } from "./custom.errors.js";

export const handleError = (error, res) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  // --> Send log to anywhere: console.log(`${error}`);
  return res.status(500).json({ error: 'Internal server error' })
}