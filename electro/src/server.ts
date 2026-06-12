import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log(`Muvaffaqiyatli ulandi gazini BOOS~`);
    const PORT = Number(process.env.PORT ?? 4000);
    const displayHost = process.env.VPS_IP ?? "localhost";

    app.listen(PORT, "0.0.0.0", function () {
      console.info(`Server ishga tushdi — port: ${PORT}`);
      console.info(`Admin panel: http://${displayHost}:${PORT}/admin`);
      console.info(`API:         http://${displayHost}:${PORT}\n`);
    });
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));
