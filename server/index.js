const express = require("express");
const { connectDB } = require("./connectDB.js");
const cors = require("cors");
const dotenv = require('dotenv');
const userRouter = require("./routes/userRoute.js");
const companyRouter = require("./routes/companyRoute.js")

dotenv.config({ path: './server/.env' });


//config express
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extension: true }));

//connect database
connectDB();

//enable CORS
app.use(cors());

//port
const port = process.env.PORT || 5001;
console.log(process.env.USER_ACCESS_TOKEN_SECRET)

app.use("/api/users", userRouter);
app.use("/api/company", companyRouter)

app.get("/", (req, res) => {
  res.send("This is server");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
