import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Badge, Button, Spinner } from 'react-bootstrap';
import { Heart, Pen, PaintBucket, Film, ExternalLink, Eye, Calendar, Award, Star, MessageSquare, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/fancreation.css';

// Enhanced data structure with TypeScript-like interfaces
// interface FanFiction {
//   id: number;
//   title: string;
//   author: string;
//   platform: string;
//   likes: string;
//   summary: string;
//   link: string;
//   datePublished: string;
//   wordCount: string;
//   chapters: number;
//   status: 'Ongoing' | 'Completed' | 'Hiatus';
//   rating: number;
//   featured: boolean;
//   tags: string[];
//   category: string;
// }

// Mock data enhanced with more details and consistent structure
const fanContentData = {
  fiction: [
    {
      id: 1,
      title: "The Marauders: Untold Stories",
      author: "MoonlightProngs",
      platform: "Archive of Our Own",
      likes: "15.2K",
      summary: "A deep dive into the lives of the Marauders during their early years at Hogwarts.",
      link: "#",
      datePublished: "March 12, 2025",
      wordCount: "85.4K",
      chapters: 24,
      status: "Ongoing",
      rating: 4.9,
      featured: true,
      tags: ["marauders", "hogwarts", "james potter", "sirius black"],
      category: "Adventure"
    },
    {
      id: 2,
      title: "Hogwarts: A New Generation",
      author: "WizardingScribe",
      platform: "FanFiction.net",
      likes: "12.8K",
      summary: "Following the children of Harry, Ron, and Hermione as they navigate their own adventures at Hogwarts.",
      link: "#",
      datePublished: "January 5, 2025",
      wordCount: "124.7K",
      chapters: 36,
      status: "Completed",
      rating: 4.7,
      featured: false,
      tags: ["next generation", "albus potter", "rose weasley", "scorpius malfoy"],
      category: "Family"
    },
    {
      id: 3,
      title: "The Lost Letters of Lily Evans",
      author: "PotterProse",
      platform: "Archive of Our Own",
      likes: "9.3K",
      summary: "Discovered correspondence between Lily Evans and her friends during the First Wizarding War.",
      link: "#",
      datePublished: "February 18, 2025",
      wordCount: "42.3K",
      chapters: 12,
      status: "Ongoing",
      rating: 4.8,
      featured: false,
      tags: ["lily evans", "letters", "first wizarding war", "marauders era"],
      category: "Drama"
    }
  ],
  art: [
    {
      id: 1,
      title: "The Battle of Hogwarts",
      artist: "MagicBrush",
      platform: "DeviantArt",
      likes: "25.6K",
      image: "img-fan1.jpg",
      link: "#",
      datePublished: "March 5, 2025",
      medium: "Digital Painting",
      viewCount: "132.5K",
      featured: true,
      tags: ["battle", "hogwarts", "war"],
      dimensions: "3840x2160px",
      description: "A panoramic view of the final battle at Hogwarts, capturing the chaos and bravery of the defenders."
    },
    {
      id: 2,
      title: "Marauders Map Reimagined",
      artist: "WizardArtist",
      platform: "Instagram",
      likes: "18.9K",
      image: "img-fan2.jpg",
      link: "#",
      datePublished: "February 24, 2025",
      medium: "Illustration",
      viewCount: "98.4K",
      featured: false,
      tags: ["marauders", "map", "illustration"],
      dimensions: "2400x3200px",
      description: "A detailed reimagining of the Marauder's Map with new hidden passages and secret rooms."
    },
    {
      id: 3,
      title: "Hogwarts in the Seasons",
      artist: "MagicalCreations",
      platform: "DeviantArt",
      likes: "22.1K",
      image: "img-fan3.jpg",
      link: "#",
      datePublished: "January 17, 2025",
      medium: "Watercolor",
      viewCount: "113.2K",
      featured: false,
      tags: ["hogwarts", "seasons", "landscape"],
      dimensions: "1800x2400px",
      description: "A series of four watercolor paintings showing Hogwarts castle throughout the changing seasons."
    }
  ],
  films: [
    {
      id: 1,
      title: "Severus Snape and the Marauders",
      creator: "Broad Strokes",
      platform: "YouTube",
      views: "2.1M",
      thumbnail: "img-fan4.jpg",
      duration: "25:34",
      link: "#",
      datePublished: "March 1, 2025",
      rating: 4.8,
      comments: "15.3K",
      featured: true,
      tags: ["snape", "marauders", "origin"],
      description: "A gripping fan film exploring the complex relationship between Severus Snape and the Marauders during their final year at Hogwarts.",
      cast: ["John Doe as Severus Snape", "Jane Smith as Lily Evans"],
      crew: ["Director: Alex Johnson", "Cinematographer: Sam Wilson"]
    },
    {
      id: 2,
      title: "Voldemort: Origins of the Heir",
      creator: "TryLife Studios",
      platform: "YouTube",
      views: "1.8M",
      thumbnail: "img-fan5.jpg",
      duration: "52:18",
      link: "#",
      datePublished: "February 10, 2025",
      rating: 4.9,
      comments: "12.7K",
      featured: false,
      tags: ["voldemort", "tom riddle", "origin"],
      description: "A professionally produced fan film exploring Tom Riddle's journey to becoming Lord Voldemort through the eyes of the heir of Gryffindor.",
      cast: ["Alex White as Tom Riddle", "Sarah Johnson as Grisha McLaggen"],
      crew: ["Director: Maria Rodriguez", "Writer: David Wang"]
    },
    {
      id: 3,
      title: "The House of Black: A Family's Legacy",
      creator: "WizardingFilms",
      platform: "YouTube",
      views: "987K",
      thumbnail: "img-fan6.jpg",
      duration: "18:45",
      link: "#",
      datePublished: "January 22, 2025",
      rating: 4.7,
      comments: "8.2K",
      featured: false,
      tags: ["black family", "sirius", "heritage"],
      description: "A documentary-style fan film exploring the complex history and legacy of the Noble and Most Ancient House of Black.",
      cast: ["Voice narration by Emma Thompson"],
      crew: ["Director: Chris Evans", "Researcher: Lisa Black"]
    }
  ]
};

// Animation variants with performance optimizations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100
    }
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3
    }
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

// Memoized components for performance
const FeaturedBadge = React.memo(() => (
  <Badge bg="warning" className="position-absolute top-0 start-0 featured-badge m-3 px-2 py-1">
    <Award size={14} className="me-1" /> Featured
  </Badge>
));

const StarRating = React.memo(({ rating }) => (
  <div className="rating">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={`star-icon ${i < Math.floor(rating) ? 'filled' : ''}`}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
        stroke="currentColor"
      />
    ))}
    <span className="rating-number ms-1">{rating.toFixed(1)}</span>
  </div>
));

const TagList = React.memo(({ tags }) => (
  <div className="tags-container">
    {tags.map((tag, index) => (
      <span key={index} className="tag">#{tag}</span>
    ))}
  </div>
));

// Card components with memoization
const FanArtCard = React.memo(({ art, onViewDetails }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      variants={itemVariants}
      whileHover="hover"
      layout
    >
      <Card className="h-100 mb-4 card-hover">
        {art.featured && <FeaturedBadge />}
        <div className="card-img-wrapper">
          {inView && (
            <Card.Img
              variant="top"
              src={require(`../assets/images/${art.image}`)}
              onError={(e) => {
                e.target.src = require('../assets/images/bg-1.jpg');
              }}
              alt={art.title}
              className="card-img-animate"
            />
          )}
          <div className="card-img-overlay-icons">
            <span className="overlay-icon">
              <Eye size={16} className="me-1" /> {art.viewCount}
            </span>
          </div>
          <motion.div 
            className="card-details-overlay"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="light" 
              size="sm" 
              className="details-btn"
              onClick={() => onViewDetails(art)}
            >
              View Details
            </Button>
          </motion.div>
        </div>
        <Card.Body>
          <Card.Title className="art-title">{art.title}</Card.Title>
          <div className="card-meta">
            <div className="d-flex align-items-center mb-2">
              <Badge bg="secondary" className="art-medium me-2">{art.medium}</Badge>
              <span className="likes-count">
                <Heart size={14} className="me-1 heart-icon" fill="currentColor" />
                {art.likes}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center artist-info">
              <span className="artist-name">by {art.artist}</span>
              <span className="platform-name">{art.platform}</span>
            </div>
            <div className="publish-date">
              <Calendar size={14} className="me-1" />
              {art.datePublished}
            </div>
            <div className="dimensions mt-2">
              <span className="dimensions-label">Size:</span> {art.dimensions}
            </div>
          </div>
          <TagList tags={art.tags} />
          <div className="btn-group mt-3 w-100">
            <Button 
              variant="primary" 
              href={art.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="view-btn"
            >
              View Artwork <ExternalLink size={16} className="ms-1" />
            </Button>
            <Button 
              variant="outline-primary"
              onClick={() => onViewDetails(art)}
              className="view-btn"
            >
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
});

const FanFilmCard = React.memo(({ film, onViewDetails }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      variants={itemVariants}
      whileHover="hover"
      layout
    >
      <Card className="h-100 mb-4 card-hover">
        {film.featured && <FeaturedBadge />}
        <div className="card-img-wrapper">
          {inView && (
            <Card.Img
              variant="top"
              src={require(`../assets/images/${film.thumbnail}`)}
              onError={(e) => {
                e.target.src = require('../assets/images/bg-1.jpg');
              }}
              alt={film.title}
              className="card-img-animate"
            />
          )}
          <span className="duration-badge">
            <Film size={14} className="me-1" />
            {film.duration}
          </span>
          <div className="play-button-overlay">
            <motion.div 
              className="play-circle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="white"/>
              </svg>
            </motion.div>
          </div>
        </div>
        <Card.Body>
          <Card.Title className="film-title">{film.title}</Card.Title>
          <Card.Text className="film-description text-truncate-3">
            {film.description}
          </Card.Text>
          <div className="card-meta">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="creator-info">by {film.creator}</div>
              <div className="views-count">
                <Eye size={14} className="me-1" />
                {film.views} views
              </div>
            </div>
            <div className="publish-date mb-2">
              <Calendar size={12} className="me-1" />
              {film.datePublished}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <StarRating rating={film.rating} />
              <div className="comments-count">
                <MessageSquare size={14} className="me-1" />
                {film.comments}
              </div>
            </div>
          </div>
          <TagList tags={film.tags} />
          <div className="btn-group mt-3 w-100">
            <Button 
              variant="primary" 
              href={film.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="view-btn"
            >
              Watch Film <ExternalLink size={16} className="ms-1" />
            </Button>
            <Button 
              variant="outline-primary"
              onClick={() => onViewDetails(film)}
              className="view-btn"
            >
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
});

const FanFictionCard = React.memo(({ story, onViewDetails }) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover="hover"
      layout
    >
      <Card className="h-100 mb-4 card-hover">
        {story.featured && <FeaturedBadge />}
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <Badge 
              bg={story.category === "Adventure" ? "success" : 
                 story.category === "Drama" ? "danger" : 
                 story.category === "Family" ? "info" : "secondary"} 
              className="category-badge me-2"
            >
              {story.category}
            </Badge>
            <Badge 
              bg={story.status === "Completed" ? "success" : 
                 story.status === "Hiatus" ? "warning" : "info"} 
              className="status-badge"
            >
              {story.status}
            </Badge>
          </div>
          <Card.Title className="fiction-title">{story.title}</Card.Title>
          <div className="d-flex align-items-center mb-3">
            <div className="likes-container">
              <Heart size={14} className="me-1 heart-icon" fill="currentColor" />
              <span>{story.likes}</span>
            </div>
            <div className="ms-3">
              <StarRating rating={story.rating} />
            </div>
          </div>
          <Card.Text className="story-summary text-truncate-3">{story.summary}</Card.Text>
          <div className="card-meta">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="author-info">by {story.author}</div>
              <div className="platform-info">{story.platform}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center fiction-stats">
              <div className="chapters-info">
                <BookOpen size={14} className="me-1" />
                {story.chapters} chapters
              </div>
              <div className="wordcount-info">
                <Pen size={14} className="me-1" />
                {story.wordCount} words
              </div>
            </div>
            <div className="publish-date mt-2">
              <Calendar size={12} className="me-1" />
              {story.datePublished}
            </div>
          </div>
          <TagList tags={story.tags} />
          <div className="btn-group mt-3 w-100">
            <Button 
              variant="primary" 
              href={story.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="view-btn"
            >
              Read Story <ExternalLink size={16} className="ms-1" />
            </Button>
            <Button 
              variant="outline-primary"
              onClick={() => onViewDetails(story)}
              className="view-btn"
            >
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
});

// Modal component for displaying details
const DetailsModal = React.memo(({ show, onHide, item, itemType }) => {
  if (!item) return null;
  
  return (
    <motion.div 
      className={`modal-backdrop ${show ? 'show' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      onClick={onHide}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: show ? 1 : 0.8, opacity: show ? 1 : 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h5 className="modal-title">{item.title}</h5>
          <button type="button" className="btn-close" onClick={onHide}></button>
        </div>
        <div className="modal-body">
          {itemType === 'art' && (
            <>
              <div className="modal-image-container">
                <img 
                  src={require(`../assets/images/${item.image}`)} 
                  alt={item.title} 
                  className="modal-image"
                  onError={(e) => {
                    e.target.src = require('../assets/images/bg-1.jpg');
                  }}
                />
              </div>
              <div className="modal-details">
                <h6>Description</h6>
                <p>{item.description}</p>
                <div className="details-grid">
                  <div>
                    <strong>Artist:</strong> {item.artist}
                  </div>
                  <div>
                    <strong>Medium:</strong> {item.medium}
                  </div>
                  <div>
                    <strong>Platform:</strong> {item.platform}
                  </div>
                  <div>
                    <strong>Dimensions:</strong> {item.dimensions}
                  </div>
                  <div>
                    <strong>Published:</strong> {item.datePublished}
                  </div>
                  <div>
                    <strong>Views:</strong> {item.viewCount}
                  </div>
                </div>
              </div>
            </>
          )}
          
          {itemType === 'film' && (
            <>
              <div className="modal-image-container">
                <img 
                  src={require(`../assets/images/${item.thumbnail}`)} 
                  alt={item.title} 
                  className="modal-image"
                  onError={(e) => {
                    e.target.src = require('../assets/images/100.jpg');
                  }}
                />
                <div className="play-button-overlay">
                  <div className="play-circle">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="modal-details">
                <h6>Description</h6>
                <p>{item.description}</p>
                <h6>Cast</h6>
                <ul className="cast-list">
                  {item.cast.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
                <h6>Crew</h6>
                <ul className="crew-list">
                  {item.crew.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
                <div className="details-grid">
                  <div>
                    <strong>Creator:</strong> {item.creator}
                  </div>
                  <div>
                    <strong>Platform:</strong> {item.platform}
                  </div>
                  <div>
                    <strong>Duration:</strong> {item.duration}
                  </div>
                  <div>
                    <strong>Published:</strong> {item.datePublished}
                  </div>
                  <div>
                    <strong>Views:</strong> {item.views}
                  </div>
                  <div>
                    <strong>Rating:</strong> {item.rating} ({item.comments} comments)
                  </div>
                </div>
              </div>
            </>
          )}
          
          {itemType === 'fiction' && (
            <>
              <div className="modal-details">
                <h6>Summary</h6>
                <p>{item.summary}</p>
                <div className="details-grid">
                  <div>
                    <strong>Author:</strong> {item.author}
                  </div>
                  <div>
                    <strong>Platform:</strong> {item.platform}
                  </div>
                  <div>
                    <strong>Status:</strong> {item.status}
                  </div>
                  <div>
                    <strong>Category:</strong> {item.category}
                  </div>
                  <div>
                    <strong>Chapters:</strong> {item.chapters}
                  </div>
                  <div>
                    <strong>Word Count:</strong> {item.wordCount}
                  </div>
                  <div>
                    <strong>Published:</strong> {item.datePublished}
                  </div>
                  <div>
                    <strong>Rating:</strong> {item.rating}
                  </div>
                  <div>
                    <strong>Likes:</strong> {item.likes}
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="modal-tags">
            <h6>Tags</h6>
            <TagList tags={item.tags} />
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button 
            variant="primary" 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {itemType === 'art' ? 'View Artwork' : 
             itemType === 'film' ? 'Watch Film' : 'Read Story'} 
            <ExternalLink size={16} className="ms-1" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
});

function AppFanCreations() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('films');
  const [isVisible, setIsVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    show: false,
    item: null,
    itemType: null,
  });
  const [filters, setFilters] = useState({
    sortBy: 'featured',
    featured: false,
    search: '',
  });
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Simulating data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIsVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle tab change with animation
  const handleTabChange = useCallback((key) => {
    setIsVisible(false);
    setTimeout(() => {
      setActiveCategory(key);
      setIsVisible(true);
    }, 300);
  }, []);

  // Handle modal actions
  const showDetails = useCallback((item, type) => {
    setModalDetails({
      show: true,
      item,
      itemType: type,
    });
  }, []);

  const hideDetails = useCallback(() => {
    setModalDetails({
      show: false,
      item: null,
      itemType: null,
    });
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Process and filter data based on active filters
  const filteredData = useMemo(() => {
    let data;

    switch (activeCategory) {
      case 'fiction':
        data = [...fanContentData.fiction];
        break;
      case 'art':
        data = [...fanContentData.art];
        break;
      case 'films':
        data = [...fanContentData.films];
        break;
      default:
        data = [];
    }

    // Apply search filter if present
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      data = data.filter((item) => {
        const searchableFields = ['title', 'author', 'artist', 'creator', 'description', 'summary'];
        return (
          searchableFields.some(
            (field) => item[field] && item[field].toLowerCase().includes(searchTerm)
          ) || (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
        );
      });
    }

    // Apply featured filter if enabled
    if (filters.featured) {
      data = data.filter((item) => item.featured);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'featured':
        data.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'newest':
        data.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
        break;
      case 'popular':
        data.sort((a, b) => {
          const aPopularity = a.likes || a.views || '0';
          const bPopularity = b.likes || b.views || '0';
          return (
            parseFloat(bPopularity.replace(/[^\d.]/g, '')) -
            parseFloat(aPopularity.replace(/[^\d.]/g, ''))
          );
        });
        break;
      case 'rating':
        data.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return data;
  }, [activeCategory, filters]);

  // Loading state with enhanced animation
  if (loading) {
    return (
      <div className="loading-container">
        <div className="magic-loader">
          <div className="loader-inner"></div>
          <div className="loader-sparkles"></div>
          <Spinner animation="border" role="status" className="loader-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        <motion.p
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Summoning magical creations...
        </motion.p>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Fan Creations</h1>
      <div className="filter-bar mb-4">
        <Tab.Container activeKey={activeCategory} onSelect={handleTabChange}>
          <Nav variant="pills" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="fiction">Fan Fiction</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="art">Fan Art</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="films">Fan Films</Nav.Link>
            </Nav.Item>
          </Nav>
        </Tab.Container>
      </div>
      <div className="filter-controls mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="form-check form-switch me-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="featuredSwitch"
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="featuredSwitch">
                Featured Only
              </label>
            </div>
            <div className="input-group search-input me-3">
              <span className="input-group-text" id="search-addon">
                <Pen size={16} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="search-addon"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort By: {filters.sortBy}
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleFilterChange('sortBy', 'featured')}
                  >
                    Featured
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleFilterChange('sortBy', 'newest')}
                  >
                    Newest
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleFilterChange('sortBy', 'popular')}
                  >
                    Most Popular
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleFilterChange('sortBy', 'rating')}
                  >
                    Highest Rating
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-2">Showing {filteredData.length} results</span>
            <Button variant="primary" onClick={() => handleFilterChange('search', '')}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="content-grid"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredData.map((item, index) =>
              activeCategory === 'fiction' ? (
                <FanFictionCard key={index} story={item} onViewDetails={showDetails} />
              ) : activeCategory === 'art' ? (
                <FanArtCard key={index} art={item} onViewDetails={showDetails} />
              ) : (
                <FanFilmCard key={index} film={item} onViewDetails={showDetails} />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <DetailsModal
        show={modalDetails.show}
        onHide={hideDetails}
        item={modalDetails.item}
        itemType={modalDetails.itemType}
      />
    </Container>
  );
}

export default AppFanCreations;