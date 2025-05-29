DROP DATABASE IF EXISTS bodyMine;
CREATE DATABASE bodyMine;
USE bodyMine;

-- Table : patients
CREATE TABLE patients (
  patient_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  photo_url VARCHAR(255),
  birth_date DATE,
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  allergies_to_medicine VARCHAR(255),
  blood_group VARCHAR(10),
  height_cm INT,
  weight_kg INT,
  gender VARCHAR(20),
  favorite_specialization VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table : clinics
CREATE TABLE clinics (
  clinic_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(15),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table : professionals
CREATE TABLE professionals (
  professional_id INT PRIMARY KEY AUTO_INCREMENT,
  clinic_id INT NULL,
  full_name VARCHAR(150) NOT NULL,
  clinic_name VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  specialization VARCHAR(255),
  practice_tenure INT,
  practice_start_date DATE,
  `type` VARCHAR(50),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id)
);

-- Table : specializations
CREATE TABLE specializations (
  specialization_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  icon_url VARCHAR(255)
);

-- Table : articles
CREATE TABLE articles (
  article_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES professionals(professional_id)
);

-- Table : banners
CREATE TABLE banners (
  banner_id INT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(255) NOT NULL,
  description TEXT
);

-- Table : professional_banners (relation entre les professionnels et les bannières sélectionnées)
CREATE TABLE professional_banners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  professional_id INT,
  banner_id INT,
  selected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professional_id) REFERENCES professionals(professional_id),
  FOREIGN KEY (banner_id) REFERENCES banners(banner_id)
);

-- Table : mybody_projects
CREATE TABLE mybody_projects (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  title VARCHAR(255),
  date_line DATE,
  budget DECIMAL(10,2),
  desired_surgery VARCHAR(255),
  interested_country VARCHAR(100),
  comments TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- Table : notifications
CREATE TABLE notifications (
  notification_id INT PRIMARY KEY AUTO_INCREMENT,
  professional_id INT,
  project_id INT,
  message TEXT,
  `read` INT DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professional_id) REFERENCES professionals(professional_id),
  FOREIGN KEY (project_id) REFERENCES mybody_projects(project_id)
);

-- Table : premium_subscriptions
CREATE TABLE premium_subscriptions (
  subscription_id INT PRIMARY KEY AUTO_INCREMENT,
  professional_id INT,
  start_date DATETIME,
  end_date DATETIME,
  subscriptions_name VARCHAR(50),
  `status` ENUM('active', 'inactive'),
  FOREIGN KEY (professional_id) REFERENCES professionals(professional_id)
);

-- Table : professional_photos
CREATE TABLE professional_photos (
  photo_id INT PRIMARY KEY AUTO_INCREMENT,
  professional_id INT,
  photo_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  `type` VARCHAR(50),
  FOREIGN KEY (professional_id) REFERENCES professionals(professional_id)
);

-- Table : chats
CREATE TABLE chats (
  chat_id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  professional_id INT,
  sender VARCHAR(50),
  `message` TEXT,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
  FOREIGN KEY (professional_id) REFERENCES professionals(professional_id)
);

-- Table : promotions
CREATE TABLE promotions (
  promotion_id INT PRIMARY KEY AUTO_INCREMENT,
  professional_id INT,
  discount_percentage DECIMAL(5,2),
  promotion_code VARCHAR(100),
  start_date DATETIME,
  end_date DATETIME,
  `description` TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive'),
  FOREIGN KEY (professional_id) REFERENCES professionals(professional_id)
);

-- Table : premium_subscriptions_with_discount
CREATE TABLE premium_subscriptions_with_discount (
  subscription_id INT PRIMARY KEY AUTO_INCREMENT,
  professional_id INT,
  start_date DATETIME,
  end_date DATETIME,
  `status` ENUM('active', 'inactive'),
  discount_applied BOOLEAN DEFAULT FALSE,
  promotion_id INT,
  FOREIGN KEY (professional_id) REFERENCES professionals(professional_id),
  FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id)
);

-- Table : admins
CREATE TABLE admins (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
