import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded; // { userId, email }
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
