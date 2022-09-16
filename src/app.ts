import app from "./index";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const port = Number(process.env.PORT) || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});