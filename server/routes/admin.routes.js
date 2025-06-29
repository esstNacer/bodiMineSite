import { Router } from 'express';
const router = Router();
import db from '../db.js';

// 📊 Dashboard stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const [[{ users }]] = await db.query("SELECT COUNT(*) AS users FROM patients");
    const [[{ pros }]] = await db.query("SELECT COUNT(*) AS pros FROM professionals");
    const [[{ projects }]] = await db.query("SELECT COUNT(*) AS projects FROM mybody_projects");
    const [[{ messages }]] = await db.query("SELECT COUNT(*) AS messages FROM chats");
    const [[{ services }]] = await db.query("SELECT COUNT(*) AS services FROM premium_subscriptions");
    const [[{ revenue }]] = await db.query(`
      SELECT COALESCE(SUM(value), 0) AS revenue 
      FROM premium_subscriptions 
      WHERE status = 'active'
    `);

    const [servicesByMonth] = await db.query(`
      SELECT MONTHNAME(start_date) AS mois, COUNT(*) AS services
      FROM premium_subscriptions
      GROUP BY MONTH(start_date)
      ORDER BY MONTH(start_date)
    `);

    const [subscriptionDistribution] = await db.query(`
      SELECT 
        CASE WHEN is_premium THEN 'Payants' ELSE 'Gratuits' END AS type,
        COUNT(*) AS value
      FROM professionals
      GROUP BY is_premium
    `);

    res.json({ users, pros, projects, messages, services, revenue, servicesByMonth, subscriptionDistribution });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// 🏥 Cliniques avec géolocalisation
router.get("/clinics", async (req, res) => {
  try {
    const [clinics] = await db.query(`
      SELECT name, address, city, latitude, longitude
      FROM clinics
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
    `);
    res.json(clinics);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la récupération des cliniques");
  }
});

// 📅 Projets du calendrier
router.get('/calendar', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        mybody_projects.date_line, 
        patients.first_name, 
        patients.last_name
      FROM mybody_projects
      JOIN patients ON mybody_projects.patient_id = patients.patient_id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Erreur calendrier projets :", error);
    res.status(500).send("Erreur serveur");
  }
});
// routes/dashboard.js
router.get("/professionals", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT full_name, email, created_at FROM professionals ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});
router.get("/payments", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.full_name, p.email, p.specialization, p.is_premium, s.value, s.start_date, s.subscriptions_name, s.end_date
      FROM premium_subscriptions s
      JOIN professionals p ON s.professional_id = p.professional_id
      ORDER BY s.start_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});
router.get("/tickets", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
  mp.project_id AS ticket_id,
  pa.first_name AS patient_first_name,
  pa.last_name AS patient_last_name,
  pr.full_name AS professional_name,
  mp.title AS project_title,
  mp.budget,
  mp.date_line,
  CASE 
    WHEN mp.date_line < CURDATE() THEN 'Fini'
    ELSE 'En cours'
  END AS status
FROM mybody_projects mp
JOIN patients pa ON mp.patient_id = pa.patient_id
LEFT JOIN professionals pr ON pr.professional_id = (
  SELECT professional_id 
  FROM notifications 
  WHERE project_id = mp.project_id 
  LIMIT 1
)
ORDER BY mp.date_line DESC;

    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// 🏆 Offrir un abonnement à un professionnel
router.post("/offert", async (req, res) => {
  const { professional_id, subscriptions_name, end_date } = req.body;
  if (!professional_id || !subscriptions_name || !end_date) {
    return res.status(400).json({ message: "Paramètres manquants" });
  }

  const start_date = new Date();     // maintenant
  const value      = 0;              // gratuit

  const connection = await db.getConnection(); // récupère une connexion dédiée
  try {
    await connection.beginTransaction();

    // 1️⃣  Insertion dans premium_subscriptions
    await connection.query(
      `INSERT INTO premium_subscriptions 
         (professional_id, start_date, end_date, subscriptions_name, status, value)
       VALUES (?, ?, ?, ?, 'active', ?)`,
      [professional_id, start_date, end_date, subscriptions_name, value]
    );

    // 2️⃣  Passage du pro en premium
    await connection.query(
      `UPDATE professionals 
          SET is_premium = TRUE
        WHERE professional_id = ?`,
      [professional_id]
    );

    await connection.commit();
    res.json({ message: "Abonnement offert avec succès" });
  } catch (error) {
    await connection.rollback();
    console.error("Erreur offre abonnement :", error);
    res.status(500).send("Erreur serveur lors de l’offre d’abonnement");
  } finally {
    connection.release();
  }
});



export default router;
