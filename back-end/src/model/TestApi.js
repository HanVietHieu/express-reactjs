import express from "express";
const app = express();

export const test_api = () => {
  return app.get("/", (req, res) => {
    const data = {
      name: "hieu",
      fullName: "Hán Việt Hiếu",
    };
    res.send(data);
    console.log("nani333".red);
  });
};
