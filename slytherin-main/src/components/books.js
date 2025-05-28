import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Book, Info } from 'lucide-react';
import '../styles/library.css';

// Unified books data with consistent fields
const booksData = [
    {
    id: 1,
    image: require('../assets/images/img200.jpg'),
    link: 'https://harrypotter.fandom.com/wiki/Category:Books_(real-world)',
    title: "Fantastic Beasts and Where to Find Them",
    releaseDate: "2001",
    pages: "128",
    description: "A guide to magical creatures in the Harry Potter universe.",
    category: "fiction",
    house: "all"
  },
  {
    id: 2,
    image: require('../assets/images/img211.jpg'),
    link: 'https://harrypotter.fandom.com/wiki/Category:Books_(real-world)',
    title: "Kennilworthy Quidditch Through the Ages",
    releaseDate: "2001",
    pages: "105",
    description: "A comprehensive guide to the history and rules of Quidditch.",
    category: "fiction",
    house: "all"
  },
  {
    id: 3,
    image: require('../assets/images/img212.jpg'),
    link: 'https://harrypotter.fandom.com/wiki/Category:Books_(real-world)',
    title: "Bloomsburg The Tales of Beedle the Bard",
    releaseDate: "2008",
    pages: "109",
    description: "A collection of wizarding fairy tales.",
    category: "fiction",
    house: "all"
  },
  {
    id: 4,
    image: require('../assets/images/img2.jpg'),
    link: 'https://drive.google.com/file/d/1JEtO2E4TjNkpLQVCN1PiT3zM5_BorUeY/view?usp=drive_link',
    title: "Harry Potter and the Philosopher's Stone",
    releaseDate: "1997",
    pages: "223",
    description: "Harry Potter discovers he is a wizard and begins his journey at Hogwarts School of Witchcraft and Wizardry.",
    category: "fiction",
    house: "all"
  },
  {
    id: 5,
    image: require('../assets/images/img3.jpg'),
    link: 'https://harrypotter.fandom.com/wiki/Category:Books_(real-world)',
    title: "Harry Potter and the Chamber of Secrets",
    releaseDate: "1998",
    pages: "251",
    description: "Harry's second year at Hogwarts takes a sinister turn as a mysterious force terrorizes the school.",
    category: "fiction",
    house: "slytherin"
  },
  {
    id: 6,
    image: require('../assets/images/img4.jpg'),
    link: 'https://drive.google.com/file/d/1PegG-ejx61X082yQ4akE0AajqwE16FTP/view?usp=drive_link',
    title: "Harry Potter and the Prisoner of Azkaban",
    releaseDate: "1999",
    pages: "317",
    description: "Harry learns more about his past as escaped prisoner Sirius Black seems to be hunting him.",
    category: "fiction",
    house: "all"
  },
  {
    id: 7,
    image: require('../assets/images/img5.jpg'),
    link: 'https://drive.google.com/file/d/16fP0lN6Czak4fEhZSCM7tU5aznL82MvP/view?usp=drive_link',
    title: "Harry Potter and the Goblet of Fire",
    releaseDate: "2000",
    pages: "636",
    description: "Harry mysteriously enters a dangerous tournament between three major schools of magic.",
    category: "fiction",
    house: "slytherin"
  },
  {
    id: 8,
    image: require('../assets/images/img6.jpg'),
    link: 'https://harrypotter.fandom.com/wiki/Category:Books_(real-world)',
    title: "Harry Potter and the Order of the Phoenix",
    releaseDate: "2003",
    pages: "766",
    description: "Harry forms a secret group to teach defensive magic as dark forces gather strength.",
    category: "fiction",
    house: "all"
  },
  {
    id: 9,
    image: require('../assets/images/img7.jpg'),
    link: 'https://harrypotter.fandom.com/wiki/Category:Books_(real-world)',
    title: "Harry Potter and the Half-Blood Prince",
    releaseDate: "2005",
    pages: "607",
    description: "Dumbledore prepares Harry for his final battle as they investigate Voldemort's past.",
    category: "fiction",
    house: "slytherin"
  },
  {
    id: 10,
    image: require('../assets/images/img9.jpg'),
    link: 'https://harrypotter.fandom.com/wiki/Category:Books_(real-world)',
    title: "Harry Potter and the Deathly Hallows",
    releaseDate: "2007",
    pages: "607",
    description: "The final battle between good and evil in the wizarding world comes to an epic conclusion.",
    category: "fiction",
    house: "all"
  }
];

const SlytherinLibrary = () => {
  // State variables
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'slytherin', etc.
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Configuration
  const booksPerPage = 8;
  const visibleBooks = 2;
  
  // Filtered books based on search and filter
  const filteredBooks = booksData.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || book.house === filter;
    return matchesSearch && matchesFilter;
  });
  
  // Pagination calculations
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  
  // Carousel controls - revised for smoother operation
  const nextSlide = () => {
    if (currentIndex + visibleBooks < filteredBooks.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to beginning
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, filteredBooks.length - visibleBooks)); // Go to end
    }
  };

  // Get visible books for carousel - simplified logic
  const getVisibleBooks = () => {
    return filteredBooks.slice(currentIndex, currentIndex + visibleBooks);
  };
  
  // Calculate pagination items
  const getPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <button 
        key="first" 
        className={`pagination-item ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      items.push(
        <button 
          key={i} 
          className={`pagination-item ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <button 
          key="last" 
          className={`pagination-item ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    
    return items;
  };

  return (
    <section id="library" className="slytherin-library">
      <div className="library-container">
        <div className="title-holder">
          <h1 className="decorated-title">Slytherin Secret Library</h1>
          <div className="subtitle">Magical Knowledge Available to the Worthy</div>
        </div>
        
        {/* Controls and filters */}
        <div className="library-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for spells and secrets..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
                setCurrentIndex(0); // Reset carousel position on search
              }}
            />
          </div>
          
          <div className="filter-container">
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
                setCurrentIndex(0); // Reset carousel position on filter change
              }}
            >
              <option value="all">All Books</option>
              <option value="slytherin">Slytherin Collection</option>
            </select>
            
            <div className="view-toggle">
              <button 
                className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <div className="grid-icon">
                  <div></div><div></div>
                  <div></div><div></div>
                </div>
              </button>
              <button 
                className={`toggle-button ${viewMode === 'carousel' ? 'active' : ''}`}
                onClick={() => setViewMode('carousel')}
                aria-label="Carousel view"
              >
                <div className="carousel-icon">
                  <div></div>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid View */}
        {viewMode === 'grid' && (
          <>
            <div className="books-grid">
              {currentBooks.map((book) => (
                <div key={book.id} className="book-item">
                  <div className="book-cover-container">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="book-cover"
                    />
                    <div className="book-overlay">
                      <button 
                        className="info-button"
                        onClick={() => setSelectedBook(book)}
                        aria-label="Book information"
                      >
                        <Info className="info-icon" />
                      </button>
                      <a 
                        href={book.link} 
                        className="read-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Book className="read-icon" />
                        <span>Read Now</span>
                      </a>
                    </div>
                  </div>
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-release">{book.releaseDate}</p>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-arrow"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <ChevronLeft />
                </button>
                {getPaginationItems()}
                <button 
                  className="pagination-arrow"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Carousel View */}
        {viewMode === 'carousel' && (
          <div className="carousel-container">
            <button 
              className="carousel-arrow prev"
              onClick={prevSlide}
              aria-label="Previous books"
            >
              <ChevronLeft />
            </button>
            
            <div className="carousel-track-container">
              <div 
                className="carousel-track"
                style={{
                  transform: `translateX(-${(currentIndex / filteredBooks.length) * 100}%)`
                }}
              >
                {getVisibleBooks().map((book) => (
                  <div key={book.id} className="carousel-item">
                    <div className="carousel-book">
                      <div className="book-image-container">
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="book-image"
                        />
                      </div>
                      <div className="book-details">
                        <h3 className="carousel-book-title">{book.title}</h3>
                        <p className="carousel-book-info">Released: {book.releaseDate} • {book.pages} pages</p>
                        <p className="carousel-book-description">{book.description}</p>
                        <a 
                          href={book.link} 
                          className="carousel-read-button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Book className="carousel-read-icon" />
                          <span>Read & Explore</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="carousel-arrow next"
              onClick={nextSlide}
              aria-label="Next books"
            >
              <ChevronRight />
            </button>
            
            {/* Carousel indicators */}
            <div className="carousel-indicators">
              {filteredBooks.length > visibleBooks && 
                Array.from({ length: Math.ceil(filteredBooks.length / visibleBooks) }).map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator ${Math.floor(currentIndex / visibleBooks) === index ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index * visibleBooks)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))
              }
            </div>
          </div>
        )}
        
        {/* Book Detail Modal */}
        {selectedBook && (
          <div className="book-modal-overlay" onClick={() => setSelectedBook(null)}>
            <div className="book-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedBook(null)}>×</button>
              <div className="modal-content">
                <div className="modal-image-container">
                  <img 
                    src={selectedBook.image} 
                    alt={selectedBook.title} 
                    className="modal-image"
                  />
                </div>
                <div className="modal-details">
                  <h2 className="modal-title">{selectedBook.title}</h2>
                  <p className="modal-info">Release Date: {selectedBook.releaseDate}</p>
                  <p className="modal-info">Pages: {selectedBook.pages}</p>
                  <p className="modal-description">{selectedBook.description}</p>
                  <a 
                    href={selectedBook.link} 
                    className="modal-read-button"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Book className="modal-read-icon" />
                    <span>Read & Explore Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* No results message */}
        {filteredBooks.length === 0 && (
          <div className="no-results">
            <div className="no-results-content">
              <h3>No Magical Tomes Found</h3>
              <p>Try searching for different spells or change your filters.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SlytherinLibrary;