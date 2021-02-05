import AWS from "aws-sdk";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes";
dotenv.config();

const app = express();
const SES_CONFIG = {
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: "us-east-1",
};

export const AWS_SES = new AWS.SES(SES_CONFIG);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Application listening on port ${process.env.PORT || 3333}!`);
});
