-- Insertion : specializations
INSERT INTO specializations (name, icon_url) VALUES ('Chirurgie Esthétique', 'https://cdn.example.com/icons/esthetic.png');
INSERT INTO specializations (name, icon_url) VALUES ('Dentisterie', 'https://cdn.example.com/icons/dentistry.png');
INSERT INTO specializations (name, icon_url) VALUES ('Dermatologie', 'https://cdn.example.com/icons/dermatology.png');

-- Insertion : clinics
INSERT INTO clinics (name, address, city, country, email, phone_number) VALUES ('Clinique Esthétique Paris', '123 rue de Beauté', 'Paris', 'France', 'paris@clinique.fr', '0140203040');
INSERT INTO clinics (name, address, city, country, email, phone_number) VALUES ('Clinique Smile Alger', '5 avenue des Roses', 'Alger', 'Algérie', 'alger@smile.dz', '21321234567');

-- Insertion : banners
INSERT INTO banners (image_url, description) VALUES ('https://cdn.example.com/banners/banner1.jpg', 'Promotion été 2025 - Chirurgie esthétique');
INSERT INTO banners (image_url, description) VALUES ('https://cdn.example.com/banners/banner2.jpg', 'Nouveau centre dentaire à Alger');
INSERT INTO banners (image_url, description) VALUES ('https://cdn.example.com/banners/banner3.jpg', 'Réduction -20% sur l'abonnement Premium');

-- Insertion : articles
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Les bienfaits de la rhinoplastie', 'La rhinoplastie est une chirurgie...', 'https://cdn.example.com/articles/rhino.jpg', 1);
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Soins de la peau après peeling', 'Après un peeling chimique...', 'https://cdn.example.com/articles/peeling.jpg', 2);
INSERT INTO articles (title, content, image_url, author_id) VALUES ('Chirurgie dentaire au laser', 'Le laser révolutionne les soins dentaires...', 'https://cdn.example.com/articles/laser.jpg', 3);

-- Insertion : admins
INSERT INTO admins (full_name, email, password) VALUES ('Admin Principal', 'admin1@bodymine.com', 'hashedpassword1');
INSERT INTO admins (full_name, email, password) VALUES ('Admin Support', 'admin2@bodymine.com', 'hashedpassword2');

-- Insertion : patients
INSERT INTO patients 
(first_name, last_name, photo_url, birth_date, address, city, country, email, password, phone_number, allergies_to_medicine, blood_group, height_cm, weight_kg, gender, favorite_specialization)
VALUES ('Alice', 'Durand', 'https://cdn.example.com/photos/alice.jpg', '1990-05-14', '10 rue de Paris', 'Paris', 'France', 'alice@example.com', 'pwd123', '0601020304', 'Pénicilline', 'O+', 165, 60, 'F', 'Chirurgie Esthétique');
INSERT INTO patients 
(first_name, last_name, photo_url, birth_date, address, city, country, email, password, phone_number, allergies_to_medicine, blood_group, height_cm, weight_kg, gender, favorite_specialization)
VALUES ('Mohamed', 'Ali', 'https://cdn.example.com/photos/mohamed.jpg', '1985-08-22', '4 rue des Jasmins', 'Alger', 'Algérie', 'mohamed@example.com', 'pwd456', '0771234567', 'Aucune', 'A-', 175, 75, 'M', 'Dentisterie');

-- Insertion : professionals
INSERT INTO professionals 
(clinic_id, full_name, clinic_name, city, country, email, password, phone_number, specialization, practice_tenure, practice_start_date, type, is_premium)
VALUES (1, 'Dr. Sophie Martin', 'Clinique Esthétique Paris', 'Paris', 'France', 'sophie@clinic.fr', 'hashedpwd1', '0140203040', 'Chirurgie Esthétique', 10, '2015-06-01', 'chirurgien', True);
INSERT INTO professionals 
(clinic_id, full_name, clinic_name, city, country, email, password, phone_number, specialization, practice_tenure, practice_start_date, type, is_premium)
VALUES (2, 'Dr. Amine Bensaïd', None, 'Alger', 'Algérie', 'amine@independant.dz', 'hashedpwd2', '0556677889', 'Dentisterie', 7, '2018-09-15', 'dentiste', False);
INSERT INTO professionals 
(clinic_id, full_name, clinic_name, city, country, email, password, phone_number, specialization, practice_tenure, practice_start_date, type, is_premium)
VALUES (1, 'Dr. Claire Roche', 'Clinique Esthétique Paris', 'Paris', 'France', 'claire@clinic.fr', 'hashedpwd3', '0140506070', 'Dermatologie', 5, '2020-01-10', 'dermato', True);

-- Insertion : mybody_projects
INSERT INTO mybody_projects 
(patient_id, title, date_line, budget, desired_surgery, interested_country, comments)
VALUES (1, 'Rhinoplastie', '2025-09-01', 2500.0, 'Rhinoplastie', 'France', 'Je veux une rhinoplastie en France.');
INSERT INTO mybody_projects 
(patient_id, title, date_line, budget, desired_surgery, interested_country, comments)
VALUES (2, 'Blanchiment dentaire', '2025-06-15', 400.0, 'Blanchiment dentaire', 'Algérie', 'Soin esthétique rapide et local.');

-- Insertion : notifications
INSERT INTO notifications 
(professional_id, project_id, message) VALUES (1, 1, 'Vous avez un nouveau projet à consulter.');
INSERT INTO notifications 
(professional_id, project_id, message) VALUES (2, 2, 'Un patient est intéressé par vos services.');

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
VALUES (1, 'https://cdn.example.com/photos/pro1.jpg', 'profile');
INSERT INTO professional_photos 
(professional_id, photo_url, type)
VALUES (3, 'https://cdn.example.com/photos/pro3.jpg', 'before-after');

-- Insertion : chats
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (1, 1, 'patient', "Bonjour docteur, j'aimerais plus d'informations.");
INSERT INTO chats 
(patient_id, professional_id, sender, message)
VALUES (2, 2, 'professional', 'Bonjour, voici les détails demandés.');

-- Insertion : promotions
INSERT INTO promotions 
(professional_id, discount_percentage, promotion_code, start_date, end_date, description, status)
VALUES (1, 15.0, 'SUMMER15', '2025-06-01 00:00:00', '2025-08-31 23:59:59', 'Réduction été', 'active');

-- Insertion : premium_subscriptions_with_discount
INSERT INTO premium_subscriptions_with_discount 
(professional_id, start_date, end_date, status, discount_applied, promotion_id)
VALUES (1, '2025-06-01 00:00:00', '2026-06-01 00:00:00', 'active', True, 1);

-- Insertion : professional_banners
INSERT INTO professional_banners 
(professional_id, banner_id)
VALUES (1, 1);
INSERT INTO professional_banners 
(professional_id, banner_id)
VALUES (3, 2);