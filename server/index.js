const express = require("express");
const { connectDB } = require("./connectDB.js");
const cors = require("cors");
const dotenv = require('dotenv');
const userRouter = require("./routes/userRoute.js");
const companyRouter = require("./routes/companyRoute.js");
const positionRouter = require("./routes/positionRoute.js");
const jobRouter = require("./routes/jobRoute.js");
const commonJobRouter = require("./routes/commonJobRoute.js")
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

app.use("/api/users", userRouter);
app.use("/api/company", companyRouter)
app.use("/api/position", positionRouter)
app.use("/api/job", jobRouter)
app.use("/api/occupation", commonJobRouter)


app.get("/", (req, res) => {
  res.send("This is server");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
