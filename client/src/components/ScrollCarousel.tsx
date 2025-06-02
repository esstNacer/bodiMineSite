// src/components/ScrollCarousel.tsx
import React, { useRef, useEffect, ReactNode, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ScrollCarouselProps {
  children: ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
  id: string;
  showArrows?: boolean;
  className?: string;
  itemClassName?: string;
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

const ScrollCarousel: React.FC<ScrollCarouselProps> = ({ 
  children, 
  containerRef: externalRef, 
  id, 
  showArrows = true,
  className = '',
  itemClassName = 'snap-start flex-none',
  autoRotate = true,
  autoRotateInterval = 3000
}) => {
  // Utiliser la référence fournie ou en créer une nouvelle
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = externalRef || internalRef;
  
  // État local pour le défilement
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  // Vérifier si le défilement est possible à gauche et à droite
  const checkScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    // Utiliser une plus grande marge pour masquer la flèche plus tôt et éviter les problèmes d'affichage
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15); // 15px de marge
  };

  useEffect(() => {
    // Observer les changements de scroll
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      
      // Ajouter les attributs pour aider le script mobile-swipe-fix.js
      el.setAttribute('data-carousel', id);
      
      // Vérifier initialement si le défilement est possible
      checkScroll();
      
      // Observer les changements de taille de la fenêtre
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [containerRef, id]);

  // Gérer le défilement
  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      // Ajuster le défilement en fonction de la largeur de l'écran et des éléments visibles
      const isMobile = window.innerWidth < 768;
      
      // Trouver la largeur d'un élément du carrousel si possible
      const item = containerRef.current.querySelector(`.${itemClassName.split(' ')[0]}`);
      const itemWidth = item ? (item as HTMLElement).offsetWidth + 20 : 300; // 20px pour le gap
      
      // Sur mobile, faire défiler un élément à la fois pour une meilleure expérience
      const amount = isMobile ? itemWidth : Math.min(containerRef.current.clientWidth * 0.8, 3 * itemWidth);
      
      containerRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  // Activer le défilement tactile
  useEffect(() => {
    if (!containerRef.current) return;
    
    let startX: number, endX: number;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      setIsPaused(true); // Pause auto-rotation quand l'utilisateur touche le carrousel
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      // Seuil pour détecter un swipe intentionnel
      if (Math.abs(diffX) > 50) {
        handleScroll(diffX > 0 ? "right" : "left");
      }
      
      // Réactiver l'auto-rotation après un délai
      setTimeout(() => setIsPaused(false), 2000);
    };
    
    const element = containerRef.current;
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef]);

  // Rotation automatique
  useEffect(() => {
    if (!autoRotate || isPaused || !canScrollRight) return;
    
    const autoScrollInterval = setInterval(() => {
      // Vérifier si on peut défiler à droite, sinon revenir au début
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        
        if (scrollLeft >= scrollWidth - clientWidth - 20) {
          // Revenir au début
          containerRef.current.scrollTo({
            left: 0,
            behavior: "smooth"
          });
        } else {
          // Défiler vers la droite
          handleScroll("right");
        }
      }
    }, autoRotateInterval);
    
    return () => clearInterval(autoScrollInterval);
  }, [autoRotate, isPaused, canScrollRight, containerRef, autoRotateInterval]);

  return (
    <div 
      className={`scroll-carousel-wrapper relative ${className}`} 
      data-can-scroll-left={canScrollLeft} 
      data-can-scroll-right={canScrollRight}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {showArrows && (
        <>
          <button
            className={`carousel-arrow prev absolute left-2 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer text-[#007c8a] hover:bg-[#eefaff] ${!canScrollLeft ? 'opacity-50' : 'opacity-90 hover:opacity-100'}`}
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Précédent"
          >
            <FiChevronLeft className="text-sm sm:text-base md:text-xl" />
          </button>
          
          <button
            className={`carousel-arrow next absolute right-2 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer text-[#007c8a] hover:bg-[#eefaff] ${!canScrollRight ? 'opacity-50' : 'opacity-90 hover:opacity-100'}`}
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Suivant"
          >
            <FiChevronRight className="text-sm sm:text-base md:text-xl" />
          </button>
        </>
      )}
      
      {/* Contenu du carrousel */}
      <div 
        ref={containerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollCarousel;
