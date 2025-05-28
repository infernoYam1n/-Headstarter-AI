import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/games.css';
import { 
  Gamepad2, 
  Zap, 
  Coffee, 
  Calendar, 
  Star, 
  Users, 
  Clock, 
  Laptop, 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronRight,
  Heart,
  Share2,
  Info,
  Play,
  Download
} from 'lucide-react';
import '../styles/games.css';

// Enhanced game data with more professional metadata
const gamesData = [
  {
    id: 1,
    image: require('../assets/images/img-game1.jpg'),
    title: 'Harry Potter: Hogwarts Legacy',
    releaseDate: 'February 10, 2023',
    platform: ['PS5', 'PC'],
    description: 'An immersive, open-world action RPG set in the 1800s wizarding world. Create your own character, attend classes at Hogwarts, and uncover ancient secrets.',
    longDescription: 'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books. Embark on a journey through familiar and new locations as you explore and discover fantastic beasts, customize your character and craft potions, master spell casting, upgrade talents, and become the wizard you want to be.\n\nExperience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Discover the feeling of living at Hogwarts as you make allies, battle Dark wizards, and ultimately decide the fate of the wizarding world.',
    difficulty: 'Moderate',
    genre: ['RPG', 'Adventure', 'Open World'],
    mode: ['Intense', 'Story-Driven'],
    rating: 4.7,
    playTime: '30-40 hours',
    multiplayer: false,
    developerStudio: 'Avalanche Software',
    publisher: 'Warner Bros. Games',
    systemRequirements: {
      minimum: 'Windows 10, Intel Core i5-8400, 8GB RAM, NVIDIA GTX 1070',
      recommended: 'Windows 10, Intel Core i7-10700K, 16GB RAM, NVIDIA RTX 2080'
    },
    features: ['Open World', 'Character Customization', 'Spell Combat', 'Magical Creatures'],
    link: 'https://www.hogwartslegacy.com'
  },
  {
    id: 2,
    image: require('../assets/images/img-game2.jpg'),
    title: 'Harry Potter: Magic Awakened',
    releaseDate: 'June 27, 2023',
    platform: ['iOS', 'Android', 'PC'],
    description: 'A multiplayer wizarding dueling game combining card collection with RPG elements. Master spells, attend classes, and duel other players.',
    longDescription: 'Harry Potter: Magic Awakened is a card-based RPG game featuring magical duels. Players can collect and upgrade spell cards, attend classes at Hogwarts School of Witchcraft and Wizardry, and compete in multiplayer matches against other players.\n\nThe game combines elements of collectible card games with roleplaying adventure mechanics. Players can customize their characters, build their deck of spells, and participate in various activities in the wizarding world.',
    difficulty: 'Easy to Learn, Hard to Master',
    genre: ['Card Game', 'RPG', 'Strategy'],
    mode: ['Competitive', 'Casual'],
    rating: 4.2,
    playTime: 'Varies',
    multiplayer: true,
    developerStudio: 'NetEase Games',
    publisher: 'Warner Bros. Games',
    systemRequirements: {
      minimum: 'iOS 11.0 / Android 7.0',
      recommended: 'iOS 13.0 / Android 10.0'
    },
    features: ['Card Collection', 'PvP Duels', 'School Activities', 'Seasonal Events'],
    link: 'https://www.hogwartslegacy.com'
  },
  {
    id: 3,
    image: require('../assets/images/img-game3.jpg'),
    title: 'Harry Potter: Hogwarts Mystery',
    releaseDate: 'Available Now',
    platform: ['iOS', 'Android'],
    description: 'Experience life as a Hogwarts student in the 1980s. Solve mysteries, learn spells, and make choices that influence your whole story.',
    longDescription: 'Harry Potter: Hogwarts Mystery is set in the time between Harry Potters birth and his enrollment at Hogwarts, when Nymphadora Tonks and Bill Weasley were students. The story involves investigating the disappearance of the player characters brother, who was allegedly expelled from Hogwarts after seeking the Cursed Vaults.\n\nThe player creates their own character and progresses through school years at Hogwarts, learning spells, brewing potions, and forming friendships or rivalries with other students. The game features choice-based storytelling where decisions impact the narrative progression.',
    difficulty: 'Easy',
    genre: ['Adventure', 'RPG', 'Choice-Based'],
    mode: ['Story', 'Casual'],
    rating: 4.1,
    playTime: 'Ongoing',
    multiplayer: false,
    developerStudio: 'Jam City',
    publisher: 'Portkey Games',
    systemRequirements: {
      minimum: 'iOS 10.0 / Android 5.0',
      recommended: 'iOS 12.0 / Android 8.0'
    },
    features: ['Choice-Based Narrative', 'Character Relations', 'Classes & Activities', 'Year Progression'],
    link: 'https://www.harrypotterhogwartsmystery.com'
  },
  {
    id: 4,
    image: require('../assets/images/img-game4.jpg'),
    title: 'Harry Potter: Potion Master',
    releaseDate: 'May 15, 2024',
    platform: ['PC', 'PS5', 'Xbox Series X'],
    description: 'A game focused on potion brewing and magical experiments in the Harry Potter universe.',
    longDescription: 'Harry Potter: Potion Master is a game focused on potion brewing and magical experiments in the Harry Potter universe. Players can explore various locations, collect ingredients, and brew a variety of magical potions.\n\nThe game features a deep crafting system, character customization, and a variety of quests and challenges. Players can also participate in multiplayer potion brewing competitions and cooperative gameplay to complete missions and earn rewards.',
    difficulty: 'Moderate',
    genre: ['Simulation', 'RPG', 'Adventure'],
    mode: ['Story-Driven', 'Multiplayer'],
    rating: 4.4,
    playTime: '30-40 hours',
    multiplayer: true,
    developerStudio: 'Portkey Games',
    publisher: 'Warner Bros. Games',
    systemRequirements: {
      minimum: 'Windows 10, Intel Core i5-8400, 8GB RAM, NVIDIA GTX 1070',
      recommended: 'Windows 10, Intel Core i7-10700K, 16GB RAM, NVIDIA RTX 2080'
    },
    features: ['Potion Brewing', 'Magical Experiments', 'Character Customization', 'Multiplayer Competitions'],
    link: 'https://www.harrypotterpotionmaster.com'
  },
  {
    id: 5,
    image: require('../assets/images/img-game5.jpg'),
    title: 'Harry Potter: Quidditch Champions',
    releaseDate: 'TBA',
    platform: ['PC', 'PS5', 'Xbox Series X'],
    description: 'A fast-paced, competitive multiplayer game focused on the magical sport of Quidditch.',
    longDescription: 'Harry Potter: Quidditch Champions is a fast-paced, competitive multiplayer game that brings the magical sport of Quidditch to life. Players can choose their favorite Hogwarts house and compete in matches against other players from around the world.\n\nThe game features a variety of modes, including quick matches, tournaments, and league play. Players can customize their characters, upgrade their brooms, and master different positions on the Quidditch field. The game also includes special events and challenges that offer unique rewards.',
    difficulty: 'Hard',
    genre: ['Sports', 'Multiplayer', 'Competitive'],
    mode: ['Competitive', 'Team-Based'],
    rating: 4.5,
    playTime: 'Varies',
    multiplayer: true,
    developerStudio: 'Portkey Games',
    publisher: 'Warner Bros. Games',
    systemRequirements: {
      minimum: 'Windows 10, Intel Core i5-9600K, 8GB RAM, NVIDIA GTX 1660',
      recommended: 'Windows 10, Intel Core i7-10700K, 16GB RAM, NVIDIA RTX 3060'
    },
    features: ['Quidditch Matches', 'Character Customization', 'Team-Based Gameplay', 'Special Events'],
    link: 'https://www.harrypotterquidditchchampions.com'
  },
  {
    id: 6,
    image: require('../assets/images/img-game6.jpg'),
    title: 'Harry Potter: Wizards Unite 2',
    releaseDate: 'December 15, 2024',
    platform: ['iOS', 'Android'],
    description: 'The sequel to the popular AR game, featuring new magical creatures and artifacts to discover.',
    longDescription: 'Harry Potter: Wizards Unite 2 is the sequel to the popular augmented reality game. Players explore the real world to find new magical artifacts, creatures, and characters from the Harry Potter universe. The game features enhanced AR experiences, new spell casting mechanics, and cooperative gameplay.\n\nJoin one of three factions and participate in special events and storylines that expand the Harry Potter universe. The game also includes new challenges and rewards for players to discover.',
    difficulty: 'Moderate',
    genre: ['Adventure', 'AR', 'RPG'],
    mode: ['Exploration', 'Cooperative'],
    rating: 4.4,
    playTime: 'Ongoing',
    multiplayer: true,
    developerStudio: 'Niantic',
    publisher: 'Warner Bros. Games',
    systemRequirements: {
      minimum: 'iOS 12.0 / Android 8.0',
      recommended: 'iOS 13.0 / Android 10.0'
    },
    features: ['Augmented Reality', 'Real-World Exploration', 'Spell Casting', 'Cooperative Gameplay'],
    link: 'https://www.harrypotterwizardsunite2.com'
  },
];

function AppGames() {
  // State management
  const [filter, setFilter] = useState({
    mode: 'All',
    genre: 'All',
    platform: 'All',
    searchTerm: '',
    sortBy: 'rating'
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Filter games based on current criteria
  const filteredGames = gamesData.filter(game => {
    // Mode filter
    const modeMatch = filter.mode === 'All' || game.mode.includes(filter.mode);
    
    // Genre filter
    const genreMatch = filter.genre === 'All' || game.genre.includes(filter.genre);
    
    // Platform filter
    const platformMatch = filter.platform === 'All' || game.platform.includes(filter.platform);
    
    // Search term filter
    const searchMatch = filter.searchTerm === '' || 
      game.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(filter.searchTerm.toLowerCase());
    
    return modeMatch && genreMatch && platformMatch && searchMatch;
  });

  // Sort games based on selected criteria
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch(filter.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Handle opening game details
  const openGameDetails = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  // Toggle favorite status
  const toggleFavorite = (gameId) => {
    if (favorites.includes(gameId)) {
      setFavorites(favorites.filter(id => id !== gameId));
    } else {
      setFavorites([...favorites, gameId]);
    }
  };

  // Get unique genres and platforms for filters
  const uniqueGenres = [...new Set(gamesData.flatMap(game => game.genre))];
  const uniquePlatforms = [...new Set(gamesData.flatMap(game => game.platform))];

  // Display total games count
  const totalGamesCount = sortedGames.length;

  return (
    <section id="games" className="block games-block">
      
      
      <Container fluid className="container">
        <div className="title-holder">
          <h1>wizards Gaming Centre</h1>
          <div className="subtitle">Immerse yourself in the wizarding world through our curated selection of magical experiences</div>
        </div>
        
        <div className="games-dashboard">
          {/* Filters and Search Bar */}
          <div className="games-controls">
            <div className="search-bar">
              <div className="search-input-container">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search games..."
                  value={filter.searchTerm}
                  onChange={(e) => setFilter({...filter, searchTerm: e.target.value})}
                />
              </div>
              <button 
                className="filters-toggle-btn" 
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>
            
            {/* Collapsible Filters Panel */}
            <div className={`filters-panel ${isFiltersVisible ? 'visible' : ''}`}>
              <div className="filters-header">
                <h3>Refine Your Search</h3>
                <button onClick={() => setIsFiltersVisible(false)}>
                  <X size={18} />
                </button>
              </div>
              
              <div className="filters-body">
                <div className="filter-group">
                  <label>Game Mode</label>
                  <div className="filter-buttons">
                    <button 
                      className={`filter-btn ${filter.mode === 'All' ? 'active' : ''}`} 
                      onClick={() => setFilter({...filter, mode: 'All'})}
                    >
                      All
                    </button>
                    <button 
                      className={`filter-btn intense ${filter.mode === 'Intense' ? 'active' : ''}`} 
                      onClick={() => setFilter({...filter, mode: 'Intense'})}
                    >
                      <Zap size={14} /> Intense
                    </button>
                    <button 
                      className={`filter-btn competitive ${filter.mode === 'Competitive' ? 'active' : ''}`} 
                      onClick={() => setFilter({...filter, mode: 'Competitive'})}
                    >
                      <Users size={14} /> Competitive
                    </button>
                    <button 
                      className={`filter-btn story ${filter.mode === 'Story-Driven' ? 'active' : ''}`} 
                      onClick={() => setFilter({...filter, mode: 'Story-Driven'})}
                    >
                      <Book size={14} /> Story
                    </button>
                    <button 
                      className={`filter-btn casual ${filter.mode === 'Casual' ? 'active' : ''}`} 
                      onClick={() => setFilter({...filter, mode: 'Casual'})}
                    >
                      <Coffee size={14} /> Casual
                    </button>
                  </div>
                </div>
                
                <div className="filter-group">
                  <label>Genre</label>
                  <select 
                    value={filter.genre} 
                    onChange={(e) => setFilter({...filter, genre: e.target.value})}
                  >
                    <option value="All">All Genres</option>
                    {uniqueGenres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Platform</label>
                  <select 
                    value={filter.platform} 
                    onChange={(e) => setFilter({...filter, platform: e.target.value})}
                  >
                    <option value="All">All Platforms</option>
                    {uniquePlatforms.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Sort By</label>
                  <select 
                    value={filter.sortBy} 
                    onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
                  >
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>
              
              <div className="filters-footer">
                <button onClick={() => setFilter({
                  mode: 'All',
                  genre: 'All',
                  platform: 'All',
                  searchTerm: '',
                  sortBy: 'rating'
                })}>
                  Reset Filters
                </button>
                <button onClick={() => setIsFiltersVisible(false)}>
                  Apply Filters
                </button>
              </div>
            </div>
            
            {/* Results Header */}
            <div className="results-header">
              <div className="results-count">
                <span>{totalGamesCount} games found</span>
              </div>
              <div className="view-selector">
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-sort">
                    Sort: {filter.sortBy === 'rating' ? 'Top Rated' : 
                          filter.sortBy === 'newest' ? 'Newest' : 'Title (A-Z)'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilter({...filter, sortBy: 'rating'})}>Top Rated</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({...filter, sortBy: 'newest'})}>Newest</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter({...filter, sortBy: 'title'})}>Title (A-Z)</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          
          {/* Games Grid */}
          <Row className={sortedGames.length === 0 ? 'no-results' : ''}>
            {sortedGames.length === 0 ? (
              <div className="no-games-message">
                <Info size={36} />
                <h3>No Games Found</h3>
                <p>Try adjusting your filters or search terms to find games.</p>
                <button onClick={() => setFilter({
                  mode: 'All',
                  genre: 'All',
                  platform: 'All',
                  searchTerm: '',
                  sortBy: 'rating'
                })}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              sortedGames.map(game => (
                <Col lg={4} md={6} sm={12} key={game.id}>
                  <div className="holder">
                    <Card className="game-card">
                      <div className="card-img-wrapper">
                        <Card.Img variant="top" src={game.image} />
                        <div className="card-overlay">
                          <button 
                            className="card-details-btn"
                            onClick={() => openGameDetails(game)}
                          >
                            View Details
                          </button>
                          <button 
                            className="card-play-btn"
                            onClick={() => window.open(game.link, '_blank')}
                          >
                            <Play size={18} /> Play Now
                          </button>
                        </div>
                        <div className="game-badges">
                          {game.mode.map(mode => (
                            <span key={mode} className={`mode-badge ${mode.toLowerCase().replace('-', '')}`}>
                              {mode === 'Intense' && <Zap size={12} />}
                              {mode === 'Casual' && <Coffee size={12} />}
                              {mode === 'Story-Driven' && <Book size={12} />}
                              {mode === 'Competitive' && <Users size={12} />}
                              {mode}
                            </span>
                          ))}
                        </div>
                        <div className="game-rating">
                          <Star size={14} fill="#FFD700" stroke="#FFD700" />
                          <span>{game.rating}</span>
                        </div>
                      </div>
                      <Card.Body>
                        <div className="card-header-content">
                          <Card.Title>{game.title}</Card.Title>
                          <button 
                            className={`favorite-btn ${favorites.includes(game.id) ? 'active' : ''}`}
                            onClick={() => toggleFavorite(game.id)}
                            aria-label={favorites.includes(game.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Heart 
                              size={18} 
                              fill={favorites.includes(game.id) ? "#ff3e66" : "none"} 
                              stroke={favorites.includes(game.id) ? "#ff3e66" : "currentColor"}
                            />
                          </button>
                        </div>
                        
                        <div className="game-meta">
                          <div className="meta-item">
                            <Gamepad2 size={14} />
                            <span>{game.platform.join(', ')}</span>
                          </div>
                          <div className="meta-item">
                            <Calendar size={14} />
                            <span>{game.releaseDate}</span>
                          </div>
                        </div>
                        
                        <div className="game-genre">
                          {game.genre.map(genre => (
                            <Badge key={genre} className="genre-badge">{genre}</Badge>
                          ))}
                        </div>
                        
                        <Card.Text>{game.description}</Card.Text>
                        
                        <div className="card-actions">
                          <button 
                            className="details-btn"
                            onClick={() => openGameDetails(game)}
                          >
                            Game Details <ChevronRight size={14} />
                          </button>
                          <button 
                            className="share-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(game.link);
                              alert("Game link copied to clipboard!");
                            }}
                          >
                            <Share2 size={14} />
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </div>
      </Container>
      
      {/* Game Details Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        className="game-detail-modal"
      >
        {selectedGame && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedGame.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="game-detail-content">
                <div className="game-detail-image">
                  <img src={selectedGame.image} alt={selectedGame.title} />
                  <div className="game-detail-badges">
                    {selectedGame.mode.map(mode => (
                      <span key={mode} className={`mode-badge ${mode.toLowerCase().replace('-', '')}`}>
                        {mode === 'Intense' && <Zap size={12} />}
                        {mode === 'Casual' && <Coffee size={12} />}
                        {mode === 'Story-Driven' && <Book size={12} />}
                        {mode === 'Competitive' && <Users size={12} />}
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="game-detail-info">
                  <div className="game-detail-header">
                    <div className="game-detail-rating">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(selectedGame.rating) ? "#FFD700" : "none"}
                            stroke={i < Math.floor(selectedGame.rating) ? "#FFD700" : "#aaa"}
                          />
                        ))}
                      </div>
                      <span className="rating-score">{selectedGame.rating}/5</span>
                    </div>
                    <div className="game-detail-actions">
                      <button 
                        className={`favorite-btn ${favorites.includes(selectedGame.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(selectedGame.id)}
                      >
                        <Heart 
                          size={18} 
                          fill={favorites.includes(selectedGame.id) ? "#ff3e66" : "none"} 
                          stroke={favorites.includes(selectedGame.id) ? "#ff3e66" : "currentColor"}
                        />
                        {favorites.includes(selectedGame.id) ? 'Favorited' : 'Add to Favorites'}
                      </button>
                      <button 
                        className="share-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedGame.link);
                          alert("Game link copied to clipboard!");
                        }}
                      >
                        <Share2 size={16} />
                        Share
                      </button>
                    </div>
                  </div>
                  
                  <div className="game-detail-meta">
                    <div className="meta-group">
                      <div className="meta-item">
                        <Gamepad2 size={16} />
                        <span><strong>Platform:</strong> {selectedGame.platform.join(', ')}</span>
                      </div>
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span><strong>Release Date:</strong> {selectedGame.releaseDate}</span>
                      </div>
                    </div>
                    <div className="meta-group">
                      <div className="meta-item">
                        <Users size={16} />
                        <span><strong>Multiplayer:</strong> {selectedGame.multiplayer ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={16} />
                        <span><strong>Play Time:</strong> {selectedGame.playTime}</span>
                      </div>
                    </div>
                    <div className="meta-group">
                      <div className="meta-item">
                        <Star size={16} />
                        <span><strong>Difficulty:</strong> {selectedGame.difficulty}</span>
                      </div>
                      <div className="meta-item">
                        <Laptop size={16} />
                        <span><strong>Developer:</strong> {selectedGame.developerStudio}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="game-detail-description">
                    <h4>About the Game</h4>
                    <p>{selectedGame.longDescription}</p>
                  </div>
                  
                  <div className="game-detail-features">
                    <h4>Key Features</h4>
                    <ul>
                      {selectedGame.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="game-detail-requirements">
                    <h4>System Requirements</h4>
                    <div className="requirements-grid">
                      <div className="requirements-col">
                        <h5>Minimum</h5>
                        <p>{selectedGame.systemRequirements.minimum}</p>
                      </div>
                      <div className="requirements-col">
                        <h5>Recommended</h5>
                        <p>{selectedGame.systemRequirements.recommended}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <a 
                href={selectedGame.link} 
                className="btn btn-primary" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Play size={16} /> Play Now
              </a>
              <button className="btn btn-outline-primary">
                <Download size={16} /> Download
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
}

// Missing component for Book icon
const Book = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

export default AppGames;
