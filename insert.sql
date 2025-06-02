-- Insertion : specializations
INSERT INTO specializations (name, icon_url) VALUES ('Chirurgie Esthétique', 'https://cdn.example.com/icons/esthetic.png');
INSERT INTO specializations (name, icon_url) VALUES ('Dentisterie', 'https://cdn.example.com/icons/dentistry.png');
INSERT INTO specializations (name, icon_url) VALUES ('Dermatologie', 'https://cdn.example.com/icons/dermatology.png');

-- Insertion : clinics
INSERT INTO clinics (name, address, city, country, email, phone_number) VALUES ('Clinique Esthétique Paris', '123 rue de Beauté', 'Paris', 'France', 'paris@clinique.fr', '0140203040');
INSERT INTO clinics (name, address, city, country, email, phone_number) VALUES ('Clinique Smile Alger', '5 avenue des Roses', 'Alger', 'Algérie', 'alger@smile.dz', '21321234567');
INSERT INTO clinics (name, address, city, country, email, phone_number) VALUES ('Centre Médical Mediteranéen', '45 Boulevard Maritime', 'Marseille', 'France', 'contact@cmmediteraneen.fr', '0491346578');
INSERT INTO clinics (name, address, city, country, email, phone_number) VALUES ('Clinique Derma Plus', '27 rue de la Santé', 'Lyon', 'France', 'info@dermaplus.fr', '0472589632');
INSERT INTO clinics (name, address, city, country, email, phone_number) VALUES ('Centre Dentaire Moderne', '18 avenue de Constantine', 'Oran', 'Algérie', 'contact@dentairemoderne.dz', '21341254785');

-- Insertion : banners
INSERT INTO banners (image_url, description) VALUES ('https://cdn.example.com/banners/banner1.jpg', 'Promotion été 2025 - Chirurgie esthétique');
INSERT INTO banners (image_url, description) VALUES ('https://cdn.example.com/banners/banner2.jpg', 'Nouveau centre dentaire à Alger');
INSERT INTO banners (image_url, description) VALUES ('https://cdn.example.com/banners/banner3.jpg', 'Réduction -20% sur l''abonnement Premium');

-- Insertion : admins
INSERT INTO admins (full_name, email, password) VALUES ('Admin Principal', 'admin1@bodymine.com', '$2a$10$Hy2UqYGeWCK4FuRqMYhAo.25c3mwzMKHJFEF9aGxGQnxF9I9jXE1y');
INSERT INTO admins (full_name, email, password) VALUES ('Admin Support', 'admin2@bodymine.com', '$2a$10$7VD0HYp0LnyjgSHB8BGUTuWBRn.D2QJ9Eq.RWvNJPhKmug.CRg9I.');

-- Insertion : patients
INSERT INTO patients 
(first_name, last_name, photo_url, birth_date, address, city, country, email, password, phone_number, allergies_to_medicine, blood_group, height_cm, weight_kg, gender, favorite_specialization)
VALUES ('Alice', 'Durand', '/uploads/photo_1745702453403.png', '1990-05-14', '10 rue de Paris', 'Paris', 'France', 'alice@example.com', '$2a$10$TUGAZKn0LmXCuSQBGZZ31ue9W7Y2NStV2SvO0UqJexCTr2Phdkxta', '0601020304', 'Pénicilline', 'O+', 165, 60, 'F', 'Chirurgie Esthétique');
INSERT INTO patients 
(first_name, last_name, photo_url, birth_date, address, city, country, email, password, phone_number, allergies_to_medicine, blood_group, height_cm, weight_kg, gender, favorite_specialization)
VALUES ('Mohamed', 'Ali', '/uploads/photo_1745702647658.png', '1985-08-22', '4 rue des Jasmins', 'Alger', 'Algérie', 'mohamed@example.com', '$2a$10$3gQ1aYoZaLcE.ATu1RuiCO5ACB79VQK4cG1KiDdjUFNjQ9k2i6Z4G', '0771234567', 'Aucune', 'A-', 175, 75, 'M', 'Dentisterie');
INSERT INTO patients 
(first_name, last_name, photo_url, birth_date, address, city, country, email, password, phone_number, allergies_to_medicine, blood_group, height_cm, weight_kg, gender, favorite_specialization)
VALUES ('Test', 'Utilisateur', '/uploads/682ac99326a93c666087bdb39187a000', '1995-03-18', '15 avenue Victor Hugo', 'Nice', 'France', 'test@gmail.com', '$2a$10$ptm5cGlKXn0NFZPg7TlH5eBX.htLdnyWF4U9ElMDLJwM6jzlKVlZ.', '0678901234', 'Sulfamides', 'B+', 170, 65, 'F', 'Dermatologie');

-- Insertion : professionals
INSERT INTO professionals 
(clinic_id, full_name, clinic_name, city, country, email, password, phone_number, specialization, practice_tenure, practice_start_date, type, is_premium)
VALUES (1, 'Dr. Sophie Martin', 'Clinique Esthétique Paris', 'Paris', 'France', 'sophie@clinic.fr', '$2a$10$TrSpdkM8ULJkJSg.DQ2pfuPuB41kMdF6hr4gQNP/hlbvaQEMlYpqi', '0140203040', 'Chirurgie Esthétique', 10, '2015-06-01', 'Professional', TRUE);
INSERT INTO professionals 
(clinic_id, full_name, clinic_name, city, country, email, password, phone_number, specialization, practice_tenure, practice_start_date, type, is_premium)
VALUES (2, 'Dr. Amine Bensaïd', NULL, 'Alger', 'Algérie', 'amine@independant.dz', '$2a$10$jZn1JPwZptPCh5Ix7esKbO8.XKy9d6UBwB3yccCaIj9qt2q1gxFzm', '0556677889', 'Dentisterie', 7, '2018-09-15', 'Professional', FALSE);
INSERT INTO professionals 
(clinic_id, full_name, clinic_name, city, country, email, password, phone_number, specialization, practice_tenure, practice_start_date, type, is_premium)
VALUES (1, 'Dr. Claire Roche', 'Clinique Esthétique Paris', 'Paris', 'France', 'claire@clinic.fr', '$2a$10$2Z8xfb.vHVMRYe/LbG8XOePwmAqkzHEHUVJroCQYVnMhEyXzmJAEe', '0140506070', 'Dermatologie', 5, '2020-01-10', 'Professional', TRUE);

-- Insertion : articles
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Les bienfaits de la rhinoplastie', 'La rhinoplastie est une chirurgie esthétique visant à remodeler le nez pour améliorer son apparence ou sa fonction respiratoire. Cette intervention peut corriger diverses imperfections comme une bosse sur le nez, une pointe tombante, ou un nez trop large. La période de récupération dure généralement entre 1 et 2 semaines, avec des résultats définitifs visibles après quelques mois.', '/uploads/a99b905303021e18b9395526744f39ab', 1);
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Soins de la peau après peeling', 'Après un peeling chimique, il est crucial de suivre un protocole de soins rigoureux. Hydratez votre peau plusieurs fois par jour avec une crème non comédogène, évitez l''exposition au soleil pendant au moins deux semaines et appliquez systématiquement une protection solaire SPF 50+. Ne pas arracher les peaux qui se détachent et éviter les produits contenant des acides ou de l''alcool pendant la phase de récupération.', '/uploads/b53c5482ab01adedd040630748a8e66d', 3);
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Chirurgie dentaire au laser', 'Le laser révolutionne les soins dentaires en offrant des traitements plus précis, moins invasifs et moins douloureux. Cette technologie permet de traiter les caries sans fraise, de réaliser des chirurgies gingivales sans saignement, et d''effectuer des blanchiments plus efficaces. Les patients bénéficient d''une récupération plus rapide, de moins de complications post-opératoires et d''un confort accru pendant les interventions.', '/uploads/4dd338797805e53d645d9b778687a2a7', 2);
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Innovations en médecine esthétique 2025', 'L''année 2025 marque un tournant décisif dans le domaine de la médecine esthétique avec l''introduction de nouvelles technologies non invasives. Les traitements par ultrasons focalisés permettent désormais un lifting sans chirurgie avec des résultats durables. Les injections de bio-stimulateurs de collagène de dernière génération offrent un rajeunissement naturel du visage. Découvrez comment ces innovations peuvent transformer votre approche du bien-être et de la beauté.', '/uploads/676c99f2d23737af2f0b8f5b050fe8f8', 1);
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Prévention des infections post-opératoires', 'Les infections post-opératoires représentent un risque important après toute intervention chirurgicale. Pour les minimiser, une préparation rigoureuse est essentielle : douche antiseptique la veille et le jour de l''intervention, arrêt du tabac au moins 30 jours avant, et respect strict des consignes médicales. Après l''opération, surveillez les signes d''infection comme rougeur, chaleur, douleur inhabituelle ou écoulement. Une détection précoce permet un traitement rapide et efficace.', '/uploads/fd37c063316be31e8999ac25a9a03127', 3);
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Implants dentaires: guide complet', 'Les implants dentaires constituent la solution la plus durable pour remplacer les dents manquantes. Ce guide détaille les différentes étapes du processus, depuis l''évaluation initiale jusqu''à la pose finale de la prothèse. Nous abordons les matériaux utilisés, les techniques chirurgicales modernes, et les soins nécessaires pour maintenir vos implants en parfait état pendant des décennies. Un investissement pour votre santé bucco-dentaire à long terme.', '/uploads/a2d1a4c20f5b39b65b45d964797b7819', 2);

-- Insertion : mybody_projects
INSERT INTO mybody_projects 
(patient_id, title, date_line, budget, desired_surgery, interested_country, comments)
VALUES (1, 'Rhinoplastie', '2025-09-01', 2500.0, 'Rhinoplastie', 'France', 'Je veux une rhinoplastie en France.');
INSERT INTO mybody_projects 
(patient_id, title, date_line, budget, desired_surgery, interested_country, comments)
VALUES (2, 'Blanchiment dentaire', '2025-06-15', 400.0, 'Blanchiment dentaire', 'Algérie', 'Soin esthétique rapide et local.');
INSERT INTO mybody_projects 
(patient_id, title, date_line, budget, desired_surgery, interested_country, comments)
VALUES (3, 'Traitement acné', '2025-07-20', 800.0, 'Traitement dermatologique', 'France', 'Je cherche un traitement efficace contre l''acné persistante.');

-- Insertion : notifications
INSERT INTO notifications 
(professional_id, project_id, message) VALUES (1, 1, 'Vous avez un nouveau projet à consulter.');
INSERT INTO notifications 
(professional_id, project_id, message) VALUES (2, 2, 'Un patient est intéressé par vos services.');
INSERT INTO notifications 
(professional_id, project_id, message) VALUES (3, 3, 'Nouveau projet de traitement dermatologique à examiner.');

-- Insertion : premium_subscriptions
INSERT INTO premium_subscriptions 
(professional_id, start_date, end_date, subscriptions_name, status)
VALUES (1, '2025-01-01 10:00:00', '2026-01-01 10:00:00', 'Gold', 'active');
INSERT INTO premium_subscriptions 
(professional_id, start_date, end_date, subscriptions_name, status)
VALUES (3, '2025-04-01 10:00:00', '2025-10-01 10:00:00', 'Silver', 'active');

-- Insertion : professional_photos
INSERT INTO professional_photos 
(professional_id, photo_url, type)
VALUES (1, '/uploads/photo_1745702650875.png', 'profile');
INSERT INTO professional_photos 
(professional_id, photo_url, type)
VALUES (3, '/uploads/a2d1a4c20f5b39b65b45d964797b7819', 'before-after');

-- Insertion : chats
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (1, 1, 'patient', 'Bonjour docteur, j''aimerais plus d''informations sur la procédure de rhinoplastie.');
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (1, 1, 'professional', 'Bonjour Alice, bien sûr. La rhinoplastie est une intervention qui dure environ 2 heures.');
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (2, 2, 'patient', 'Bonjour Dr. Amine, est-ce que le blanchiment dentaire est douloureux?');
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (2, 2, 'professional', 'Bonjour Mohamed, le blanchiment que je pratique est indolore et donne des résultats en une séance.');
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (3, 3, 'patient', 'Bonjour Dr. Roche, je souffre d''acné persistante depuis plusieurs années. Quels traitements recommanderiez-vous?');
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (3, 3, 'professional', 'Bonjour Test, je recommanderais un bilan dermatologique complet pour déterminer le traitement adapté. Nous pourrions envisager un traitement topique combiné à des séances de peeling doux.');
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (3, 3, 'patient', 'Avez-vous des disponibilités la semaine prochaine pour une consultation?');
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (3, 3, 'professional', 'Oui, je peux vous recevoir mardi à 14h ou jeudi à 10h. Quelle date vous conviendrait le mieux?');

-- Insertion : promotions
INSERT INTO promotions 
(professional_id, discount_percentage, promotion_code, start_date, end_date, description, status)
VALUES (1, 15.0, 'SUMMER15', '2025-06-01 00:00:00', '2025-08-31 23:59:59', 'Réduction été', 'active');

-- Insertion : premium_subscriptions_with_discount
INSERT INTO premium_subscriptions_with_discount 
(professional_id, start_date, end_date, status, discount_applied, promotion_id)
VALUES (1, '2025-06-01 00:00:00', '2026-06-01 00:00:00', 'active', TRUE, 1);

-- Insertion : professional_banners
INSERT INTO professional_banners 
(professional_id, banner_id)
VALUES (1, 1);
INSERT INTO professional_banners 
(professional_id, banner_id)
VALUES (3, 2);