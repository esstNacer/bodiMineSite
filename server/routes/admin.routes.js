// src/routes/admin.routes.js
import { Router } from 'express';
import pool       from '../db.js';   // ton pool MySQL

const router = Router();

/* -------------------------------------------------------------------------- */
/*  1) Résumé global : /api/admin/summary                                     */
/* -------------------------------------------------------------------------- */
router.get('/summary', async (_req, res) => {
  try {
    // Requêtes exécutées en parallèle
    const [
      [patients],
      [professionals],
      [professionalsPremium],
      [projects],
      [activeSubs],
      [activePromos],
      [unreadNotifs]
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) AS total FROM patients'),
      pool.query('SELECT COUNT(*) AS total FROM professionals'),
      pool.query('SELECT COUNT(*) AS total FROM professionals WHERE is_premium=true'),
      pool.query('SELECT COUNT(*) AS total FROM mybody_projects'),
      pool.query(`
        SELECT COUNT(*) AS total
          FROM premium_subscriptions
         WHERE status = 'active'
           AND end_date >= NOW()
      `),
      pool.query(`
        SELECT COUNT(*) AS total
          FROM promotions
         WHERE status = 'active'
           AND start_date <= NOW()
           AND end_date   >= NOW()
      `),
      pool.query(`
        SELECT COUNT(*) AS total
          FROM notifications
         WHERE \`read\` = 0
      `)
    ]);

    res.json({
      patients:            patients[0].total,
      professionals:       professionals[0].total,
      professionalsPremium:       professionalsPremium[0].total,
      projects:            projects[0].total,
      activeSubscriptions: activeSubs[0].total,
      activePromotions:    activePromos[0].total,
      unreadNotifications: unreadNotifs[0].total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to load summary' });
  }
});

/* -------------------------------------------------------------------------- */
/*  2) Listes récentes : /api/admin/patients etc.                             */
/* -------------------------------------------------------------------------- */
const makeListRoute = (path, query) =>
  router.get(path, async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    try {
      const [rows] = await pool.query(`${query} LIMIT ?`, [limit]);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

/* ---- a) Patients ---- */
makeListRoute(
  '/patients',
  `SELECT patient_id,
          CONCAT(first_name, ' ', last_name) AS full_name,
          email,
          created_at
     FROM patients
 ORDER BY created_at DESC`
);

/* ---- b) Professionals ---- */
makeListRoute(
  '/professionals',
  `SELECT professional_id,
          full_name,
          specialization,
          email,
          created_at
     FROM professionals
 ORDER BY created_at DESC`
);

/* ---- c) Projects ---- */
makeListRoute(
  '/projects',
  `SELECT p.project_id,
          p.title,
          p.budget,
          p.created_at,
          CONCAT(pa.first_name, ' ', pa.last_name) AS patient
     FROM mybody_projects p
     JOIN patients pa ON pa.patient_id = p.patient_id
 ORDER BY p.created_at DESC`
);

export default router;
