const express = require("express");
const { connectDB } = require("./connectDB.js");
const cors = require("cors");
const userRouter = require("./routes/userRoute.js");
const companyRouter = require("./routes/companyRoute.js")

//config express
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extension: true }));

//connect database
connectDB();

//enable CORS
app.use(cors());

//port
const port = process.env.PORT || 5000;

app.use("/api/users", userRouter);
app.use("/api/company", companyRouter)

app.get("/", (req, res) => {
  res.send("This is server");
});

app.use((err, req, res, next) => {
  res.status(500).send({ messsage: err.message });
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
