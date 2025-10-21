import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret_in_production";

/**
 * Simple in-memory user store for demo purposes.
 * Replace with a database (Postgres/Prisma/etc.) for production.
 */
const users = [];

/** Utility: simple HMAC-based password hash (demo only) */
function hashPassword(password) {
  return crypto.createHmac("sha256", JWT_SECRET).update(password).digest("hex");
}

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

/** Auth middleware */
function authenticateToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing Authorization header" });
  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Malformed token" });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/** Routes */

/** Register */
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });
  if (users.find((u) => u.email === email)) return res.status(409).json({ error: "User already exists" });

  const user = {
    id: String(users.length + 1),
    name: name || "",
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  const token = generateToken(user);
  return res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

/** Login */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const user = users.find((u) => u.email === email);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = generateToken(user);
  return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

/** Protected route example */
app.get("/api/user/me", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on http://localhost:${PORT}`);
});
