const express = require("express");
const cors = require("cors");
const { connectDB } = require("./middlewares/dbConnect");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const rolesRoute = require("./routes/roleRoutes");
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const employeeRoute = require("./routes/employeeRoute");

const app = express();
connectDB();
const PORT = process.env.PORT || 8085;

// const MONGO_URI =
//   "mongodb+srv://kaushikaditya90:mongodb@moviedb.8ckn3.mongodb.net/user_management?retryWrites=true&w=majority";
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// Consolidate CORS middleware configuration
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both 5173 and 5174
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Allow credentials if needed
//   })
// );
app.use(
  cors({
    origin: "https://gorgeous-travesseiro-82dd31.netlify.app/", // Replace with your Netlify domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Enable CORS
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use("/api/", rolesRoute);
app.use("/api/", userRoute);
app.use("/api/", authRoute);
app.use("/api/", employeeRoute);

// Login api
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     res.json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
