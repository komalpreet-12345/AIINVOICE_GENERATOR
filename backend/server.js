import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import path from "path";
import dns from "dns";
import invoiceRouter from "./routes/invoiceRouter.js";
import aiInvoiceRouter from "./routes/aiInvoiceRouter.js";
import businessProfileRouter from "./routes/businessProfileRouter.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const port = process.env.PORT || 4000;

// Database
connectDB();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(clerkMiddleware());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Static folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/invoice", invoiceRouter);
app.use("/api/businessProfile", businessProfileRouter);
app.use("/api/aiInvoice", aiInvoiceRouter);


app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});