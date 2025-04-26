// server/middleware/auth.js
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_ici';
/**
 * Middleware pour protéger les routes pros.
 * Extrait le JWT du header Authorization ("Bearer …"),
 * le vérifie et stocke son contenu dans req.user.
 */
export function authenticateProfessional(req, res, next) {
  try {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' })
    }
    const token = auth.slice('Bearer '.length)
    const payload = jwt.verify(token, JWT_SECRET)
    // payload.sub doit contenir professional_id
    req.user = { professional_id: payload.sub, role: payload.role }
    next()
  } catch (err) {
    console.error('Auth error:', err)
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
