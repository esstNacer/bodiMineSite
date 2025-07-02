// src/pages/NewsArticlesPage.tsx
import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import useBreakpoint from '../hooks/useBreakpoint';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiFileText, FiBookOpen, FiLifeBuoy, FiTrash2, FiLogOut, FiSearch, FiSliders } from 'react-icons/fi';
import '../assets/MyBodyProjectPage.css';
import '../assets/EditProfile.css';
import '../assets/NewsArticlesPage.css';

// Import des images pour le carrousel
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';

// Images d'articles fictifs
import articleImg1 from '../images/clinic1.png';
import articleImg2 from '../images/clinic2.png';
import articleImg3 from '../images/clinic3.png';

export default function NewsArticlesPage() {
  const { user } = useContext(UserContext) || ({ user: null } as any);
  const isMobile = useBreakpoint();
  
  const [slide, setSlide] = useState(0);
  const banners = [clinic1, clinic2, clinic3];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Auto-rotation du carrousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Filtres de thèmes
  const filters = [
    'All',
    'Cosmetic Surgery',
    'Skincare',
    'Wellness',
    'Beauty Tips',
    'Recovery',
    'Nutrition'
  ];

  // Articles fictifs
  const articles = [
    {
      id: 1,
      title: "The Ultimate Guide to Post-Surgery Recovery",
      excerpt: "Essential tips and advice for a smooth recovery after cosmetic surgery procedures.",
      image: articleImg1,
      category: "Recovery",
      date: "2024-12-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Skincare Routine for Healthy, Glowing Skin",
      excerpt: "Discover the perfect skincare routine to maintain healthy and radiant skin.",
      image: articleImg2,
      category: "Skincare",
      date: "2024-12-14",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Understanding Different Types of Facial Procedures",
      excerpt: "A comprehensive guide to various facial cosmetic surgery options.",
      image: articleImg3,
      category: "Cosmetic Surgery",
      date: "2024-12-13",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Nutrition for Better Skin Health",
      excerpt: "Learn how proper nutrition can improve your skin's appearance and health.",
      image: articleImg1,
      category: "Nutrition",
      date: "2024-12-12",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Mental Wellness Before and After Surgery",
      excerpt: "Tips for maintaining mental health throughout your cosmetic surgery journey.",
      image: articleImg2,
      category: "Wellness",
      date: "2024-12-11",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Beauty Tips from Professional Makeup Artists",
      excerpt: "Expert makeup tips to enhance your natural beauty and boost confidence.",
      image: articleImg3,
      category: "Beauty Tips",
      date: "2024-12-10",
      readTime: "4 min read"
    }
  ];

  // Filtrage des articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || article.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
    {!isMobile && (
    <div className="home-wrapper">
      <div className="mybody-page">        {/* ▬▬▬ NAVBAR ▬▬▬ */}
        <Header className="navbar"/>        {/* ▬▬▬ GRILLE ▬▬▬ */}
        <main className="news-full-width-content">
          {/* Page Header */}
          <div className="news-header mt-4">
            <h1>Health & Wellness Articles</h1>
            <p>Discover expert advice on cosmetic surgery, wellness, and beauty</p>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <button className="filter-btn">
                <FiSliders />
              </button>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">
                <FiSearch />
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn-theme ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="article-category">{article.category}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="no-results">
              <p>No articles found matching your search criteria.</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
    )}    {/* VERSION MOBILE */}
    {isMobile && (
      <div className="news-mobile-page">
        {/* Header mobile personnalisé */}
        <header className="news-mobile-header">
          <div>
            <h1>Health & Wellness Articles</h1>
            <p>Discover expert advice on cosmetic surgery, wellness, and beauty</p>
          </div>
        </header>
        
        <div className="mobile-content">
          {/* Search Bar */}
          <div className="search-section mobile">
            <div className="search-bar">
              <button className="filter-btn">
                <FiSliders />
              </button>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">
                <FiSearch />
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons mobile">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn-theme ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="articles-grid mobile">
            {filteredArticles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="article-category">{article.category}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="no-results">
              <p>No articles found matching your search criteria.</p>
            </div>
          )}
        </div>
        
        <BottomNav />
      </div>
    )}
    </>
  );
}
