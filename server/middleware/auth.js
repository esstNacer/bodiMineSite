// server/middleware/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_ici';

/**
 * Factory : renvoie un middleware qui vérifie l’authentification
 * et (optionnellement) le rôle exigé.
 * @param {'professional' | 'patient' | 'admin' | undefined} requiredRole
 */
function authenticateRole(requiredRole) {
  return (req, res, next) => {
    /* ── 1) Vérifier le header "Authorization: Bearer <token>" ── */
    const header = req.headers.authorization;
    const match  = /^Bearer\s+(.+)$/i.exec(header || '');

    if (!match) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const token = match[1].trim();

    try {
      /* ── 2) Décoder + vérifier le token ── */
      const payload = jwt.verify(token, JWT_SECRET);

      const userId = payload.sub || payload.id;   // supporte sub *ou* id
      if (!userId || !payload.role) {
        throw new Error('Malformed payload');
      }

      /* ── 3) Construire req.user ── */
      req.user = { id: userId, role: payload.role };

      if (payload.role === 'professional') req.user.professional_id = userId;
      if (payload.role === 'patient')      req.user.patient_id      = userId;
      if (payload.role === 'admin')        req.user.admin_id        = userId;

      /* ── 4) Vérifier le rôle requis ── */
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
      }

      return next();
    } catch (err) {
      console.error('Auth error:', err.message);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}

/* -------------------------------------------------------------------------- */
/*  Middlewares prêts à l’emploi                                              */
/* -------------------------------------------------------------------------- */
export const authenticateProfessional = authenticateRole('professional');
export const authenticatePatient      = authenticateRole('patient');
export const authenticateAdmin        = authenticateRole('admin');

/* Pour une route qui doit juste être connectée, peu importe le rôle */
export const authenticateAny          = authenticateRole(undefined);
