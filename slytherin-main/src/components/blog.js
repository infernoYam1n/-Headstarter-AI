import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Carousel,
  Modal,
  Button,
  Form,
  Tab,
  Nav,
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/blog.css';

// Constants for blog data, featured news, and events data
const blogData = [
  {
    id: 1,
    image: require('../assets/images/blog4.jpg'),
    time: '20 Nov 2024',
    title: 'Fantastic Beasts: The Ultimate Collection',
    description: 'All three Fantastic Beasts films in one marathon event with exclusive interviews and unreleased deleted scenes.',
    category: 'Marathon',
    duration: '413 min',
    rating: 'PG-13',
    link: '/movie/fantastic-beasts-collection',
    trailer: 'https://www.youtube.com/embed/ViuDsy7yb8M'
  },
  {
    id: 2,
    image: require('../assets/images/blog2.jpg'),
    time: '10 Nov 2024',
    title: 'The Half-Blood Prince - Director\'s Commentary',
    description: 'Discover the secrets behind the making of this pivotal chapter with exclusive director\'s commentary and behind-the-scenes footage.',
    category: 'Special Event',
    duration: '153 min',
    rating: 'PG-13',
    link: '/movie/half-blood-prince',
    trailer: 'https://www.youtube.com/embed/JYLdTuL9Wjw'
  },
  {
    id: 3,
    image: require('../assets/images/blog3.jpg'),
    time: '07 Nov 2024',
    title: 'The Prisoner of Azkaban - 20th Anniversary',
    description: 'Celebrating two decades since this groundbreaking film changed the visual language of the franchise with Alfonso Cuarón\'s direction.',
    category: 'Anniversary',
    duration: '142 min',
    rating: 'PG',
    link: '/movie/prisoner-of-azkaban',
    trailer: 'https://www.youtube.com/embed/lAxgztbYDbs'
  },
  {
    id: 4,
    image: require('../assets/images/blog1.jpg'),
    time: '15 Nov 2024',
    title: 'The Goblet of Fire - IMAX Experience',
    description: 'Experience the Triwizard Tournament in breathtaking IMAX quality with enhanced visual effects and remastered audio.',
    category: 'Theatrical Release',
    duration: '157 min',
    rating: 'PG-13',
    link: '/movie/goblet-of-fire',
    trailer: 'https://www.youtube.com/embed/3EGojp4Hh6I'
  },
  {
    id: 5,
    image: require('../assets/images/blog5.jpg'),
    time: '25 Nov 2024',
    title: 'The Order of the Phoenix - Behind the Scenes',
    description: 'An exclusive behind-the-scenes look at the making of The Order of the Phoenix with cast and crew interviews.',
    category: 'Documentary',
    duration: '138 min',
    rating: 'PG-13',
    link: '/movie/order-of-the-phoenix',
    trailer: 'https://www.youtube.com/embed/5wzQJ5gJw3E'
  },
  {
    id: 6,
    image: require('../assets/images/blog6.jpg'),
    time: '30 Nov 2024',
    title: 'The Deathly Hallows - Part 2: The Final Battle',
    description: 'Relive the epic conclusion of the Harry Potter saga with a special screening of The Deathly Hallows - Part 2.',
    category: 'Special Screening',
    duration: '130 min',
    rating: 'PG-13',
    link: '/movie/deathly-hallows-part-2',
    trailer: 'https://www.youtube.com/embed/mObK5XD8udk'
  }
];

const featuredNews = [
  {
    title: "HBO's 'Potter' Series Begins Casting",
    date: "17 Nov 2024",
    snippet: "HBO has officially begun the casting process for its highly anticipated Harry Potter television series, set to reimagine J.K. Rowling's beloved books."
  },
  {
    title: "Wizarding World Experience Coming to Major Cities",
    date: "12 Nov 2024",
    snippet: "Warner Bros. announces an immersive Wizarding World touring experience featuring original props, costumes, and interactive elements."
  }
];


// Event data structure
const eventsData = [
  {
    id: 1,
    title: "Chamber of Secrets 25th Anniversary Q&A",
    date: new Date("2025-04-15T19:00:00"),
    location: "AMC Theaters - Los Angeles",
    category: "Special Event",
    image: require('../assets/images/blog8.jpg'),
    description: "Join original cast members for a special Q&A session celebrating 25 years since the Chamber of Secrets first opened.",
    capacity: 120,
    registered: 87,
    price: "$25.00",
    hasGallery: false,
    isPast: false
  },
  {
    id: 2,
    title: "Wizarding Costume Contest",
    date: new Date("2025-05-02T18:30:00"),
    location: "Universal Studios",
    category: "Fan Event",
    image: require('../assets/images/blog9.jpg'),
    description: "Show off your best wizarding attire and compete for magical prizes! Categories include House Pride, Magical Creatures, and Fantastic Props.",
    capacity: 200,
    registered: 143,
    price: "$15.00",
    hasGallery: false,
    isPast: false
  },
  {
    id: 3,
    title: "Wands at the Ready: Dueling Workshop",
    date: new Date("2025-06-20T14:00:00"),
    location: "Wizarding World - Orlando",
    category: "Workshop",
    image: require('../assets/images/blog10.jpg'),
    description: "Learn proper wand techniques and dueling etiquette in this hands-on workshop with prop masters from the films.",
    capacity: 50,
    registered: 35,
    price: "$45.00",
    hasGallery: false,
    isPast: false
  },
  {
    id: 4,
    title: "Hogwarts House Cup Trivia Night",
    date: new Date("2025-03-05T19:30:00"),
    location: "Various Theaters Nationwide",
    category: "Trivia",
    image: require('../assets/images/blog7.jpg'),
    description: "Test your wizarding knowledge in this nationwide trivia competition. Teams of 4-6 compete for the House Cup and exclusive prizes.",
    capacity: 1000,
    registered: 876,
    price: "$10.00",
    hasGallery: true,
    isPast: true,
    galleryImages: [
      require('../assets/images/img-game1.jpg'),
      require('../assets/images/img-game2.jpg'),
      require('../assets/images/img-game3.jpg'),
      require('../assets/images/img-game4.jpg')
    ]
  },
  {
    id: 5,
    title: "Potions Class: Magical Mixology",
    date: new Date("2025-02-14T20:00:00"),
    location: "Warner Bros. Studio Tour",
    category: "Workshop",
    image: require('../assets/images/blog11.jpg'),
    description: "Adult fans can enjoy this 21+ event featuring themed cocktails inspired by famous potions from the wizarding world.",
    capacity: 80,
    registered: 80,
    price: "$55.00",
    hasGallery: true,
    isPast: true,
    galleryImages: [
      require('../assets/images/img-game1.jpg'),
      require('../assets/images/img-game2.jpg'),
      require('../assets/images/img-game3.jpg')
    ]
  },
  {
    id: 6,
    title: "Fantastic Beasts Collection Marathon",
    date: new Date("2025-01-30T12:00:00"),
    location: "Regal Cinemas",
    category: "Marathon",
    image: require('../assets/images/blog12.jpg'),
    description: "Experience all three Fantastic Beasts films back-to-back in this special marathon event. Includes exclusive merchandise and collectibles.",
    capacity: 150,
    registered: 150,
    price: "$30.00",
    hasGallery: false,
    isPast: true,
    galleryImages: [
      require('../assets/images/img-game1.jpg'),
      require('../assets/images/img-game2.jpg'),
      require('../assets/images/img-game3.jpg'),
      require('../assets/images/img-game4.jpg'),
      require('../assets/images/img-game5.jpg')
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// CountdownTimer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
          isComplete: false,
        };
      } else {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
        };
      }
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown">
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="digit-box">
          <span className="number">{timeLeft[unit]}</span>
          <span className="label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
        </div>
      ))}
      <div className="countdown-text">
        {timeLeft.isComplete ? 'The event has started!' : 'Until the first theatrical re-release'}
      </div>
    </div>
  );
};

// EventCalendar Component
const EventCalendar = ({ events, onEventSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const generateCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const calendar = [];
    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCount > daysInMonth) {
          week.push({ day: null, events: [] });
        } else {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            dayCount
          );
          const dayEvents = events.filter(
            (event) =>
              new Date(event.date).toDateString() === date.toDateString()
          );
          week.push({ day: dayCount, events: dayEvents, date });
          dayCount++;
        }
      }
      calendar.push(week);
      if (dayCount > daysInMonth) break;
    }
    return calendar;
  };

  const handleDateClick = (date, hasEvents) => {
    if (date && hasEvents) setSelectedDate(date);
  };

  const calendar = generateCalendar();
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <div className="event-calendar">
      <div className="calendar-header">
        <Button variant="link" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
          <i className="fas fa-chevron-left"></i>
        </Button>
        <h3>{monthName} {year}</h3>
        <Button variant="link" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
          <i className="fas fa-chevron-right"></i>
        </Button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
        {calendar.map((week, weekIdx) => (
          <div key={`week-${weekIdx}`} className="week">
            {week.map((day, dayIdx) => (
              <div
                key={`day-${weekIdx}-${dayIdx}`}
                className={`day ${day.day ? 'has-date' : ''} ${day.events.length > 0 ? 'has-events' : ''} ${selectedDate && day.date && selectedDate.getTime() === day.date.getTime() ? 'selected' : ''}`}
                onClick={() => handleDateClick(day.date, day.events.length > 0)}
              >
                <div className="day-number">{day.day}</div>
                {day.events.length > 0 && <div className="event-dot">{day.events.length} event(s)</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="selected-date-events">
          <h4>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h4>
          <div className="event-list">
            {events
              .filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString())
              .map((event) => (
                <div key={`select-event-${event.id}`} className="calendar-event-item">
                  <span className="event-time">{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="event-title">{event.title}</span>
                  <Button variant="outline-primary" size="sm" onClick={() => onEventSelect(event)}>View</Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// EventGallery Component
const EventGallery = ({ images }) => (
  <div className="event-gallery">
    <Row>
      {images.map((image, index) => (
        <Col sm={6} md={3} key={`gallery-${index}`}>
          <div className="gallery-item">
            <img src={image} alt={`Event gallery image ${index + 1}`} className="img-fluid" />
          </div>
        </Col>
      ))}
    </Row>
  </div>
);

// Main AppBlog Component
const AppBlog = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleItems, setVisibleItems] = useState(3);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets: 1,
  });
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  const releaseDate = new Date('October 11, 2025 00:00:00').getTime();
  const upcomingEvents = eventsData.filter((event) => !event.isPast);
  const pastEvents = eventsData.filter((event) => event.isPast);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEventShow = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Simulate registration submission
    setRegistrationComplete(true);
  };

  return (
    <section id="blog" className="block blog-block">
      <Container>
        {/* Title Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="title-holder">
          <h1>The Wizarding World Returns</h1>
          <div className="subtitle">Experience the Magic in Theaters & Coming Soon to HBO</div>
        </motion.div>

        {/* Carousel Section */}
        <Carousel className="hero-carousel" indicators controls>
          <Carousel.Item>
            <img className="d-block w-100" src={require('../assets/images/bg-21.jpg')} alt="Harry Potter 20th Anniversary" />
            <Carousel.Caption>
              <h3>Back to Hogwarts Celebration</h3>
              <p>All eight Harry Potter films returning to theaters nationwide this fall</p>
              <Button variant="outline-light" className="btn-hero">Learn More</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={require('../assets/images/bg-22.jpg')} alt="New HBO Series" />
            <Carousel.Caption>
              <h3>HBO Original Series Coming 2025</h3>
              <p>A faithful adaptation bringing the beloved books to life like never before</p>
              <Button variant="outline-light" className="btn-hero">Subscribe for Updates</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Countdown Banner */}
        <div className="info-banner">
          <CountdownTimer targetDate={releaseDate} />
        </div>

        {/* Content Rows */}
        <Row className="mt-5">
          <Col lg={8}>
            <motion.div className="content-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <div className="card-header">
                <h2>The Magic Reborn</h2>
                <div className="card-icon">
                  <i className="fas fa-wand-sparkles"></i>
                </div>
              </div>
              <div className="card-body-content">
                <p className="content-text">
                  Warner Bros. Pictures proudly presents the complete <strong className="decorated-text">Harry Potter</strong> film collection returning to theaters worldwide as part of the <strong className="decorated-text">Back to Hogwarts</strong> celebration.
                
 Experience all eight iconic films, from <strong className="decorated-text">Harry Potter and the Sorcerer's Stone</strong>  to <strong className="decorated-text">Harry Potter and the Deathly Hallows - Part 2</strong> remastered and enhanced for modern cinema standards.
                </p>
                <p className="content-text">
                  Beginning October 11, 2025, theaters nationwide will offer these beloved classics in multiple formats, including standard digital projection, IMAX, Dolby Cinema, and select 3D screenings. Each theatrical release will feature exclusive behind-the-scenes content and filmmaker introductions never before seen by audiences.


                </p>
                <div className="format-badges">
                  <span className="format-badge imax">IMAX</span>
                  <span className="format-badge dolby">DOLBY CINEMA</span>
                  <span className="format-badge digital">DIGITAL</span>
                  <span className="format-badge realD">REAL D 3D</span>
                </div>
                <Button variant="primary" className="mt-4 btn-full">
                  Find Theaters Near You <i className="fas fa-location-arrow"></i>
                </Button>
              </div>
            </motion.div>
          </Col>
          <Col lg={4}>
            <div className="news-sidebar">
              <div className="sidebar-header">
                <h3>Latest Updates</h3>
                <div className="header-icon">
                  <i className="fas fa-newspaper"></i>
                </div>
              </div>
              {featuredNews.map((news, index) => (
                <motion.div key={`news-${index}`} className="news-item" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}>
                  <span className="news-date">{news.date}</span>
                  <h4>{news.title}</h4>
                  <p>{news.snippet}</p>
                  <a href="#" className="news-link">Read Full Article <i className="fas fa-arrow-right"></i></a>
                </motion.div>
              ))}
              <div className="sidebar-footer">
                <Button variant="outline-light" className="btn-subscribe">
                  <i className="fas fa-envelope-open"></i> Subscribe to Updates
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <br></br>
        <div className="section-divider">
          <div className="divider-icon">
            <i class="fa-brands fa-studiovinari"></i>
          </div>
        </div>
        
        {/* Events Section */}
        <div className="section-header" id="events">
          <h2 className="section-title">Magical Events</h2>
          <p className="section-subtitle">Join us for special Wizarding World experiences and activities</p>
        </div>
        <Tab.Container id="events-tabs" defaultActiveKey="upcoming">
          <Nav variant="tabs" className="event-tabs">
            <Nav.Item>
              <Nav.Link eventKey="upcoming" onClick={() => setActiveTab('upcoming')}>Upcoming Events</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="calendar" onClick={() => setActiveTab('calendar')}>Calendar View</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="past" onClick={() => setActiveTab('past')}>Past Events</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="upcoming">
              <motion.div className="events-grid" variants={containerVariants} initial="hidden" animate="visible">
                <Row>
                  {upcomingEvents.map((event) => (
                    <Col md={6} lg={4} key={`event-${event.id}`}>
                      <motion.div className="event-card-wrapper" variants={itemVariants}>
                        <Card className="event-card">
                          <div className="card-image-wrapper">
                            <Card.Img variant="top" src={event.image} />
                            <Badge className="category-badge">{event.category}</Badge>
                          </div>
                          <Card.Body>
                            <div className="card-meta">
                              <time>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                              <span className="time">
                                <i className="far fa-clock"></i> {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <Card.Title>{event.title}</Card.Title>
                            <div className="location">
                              <i className="fas fa-map-marker-alt"></i> {event.location}
                            </div>
                            <Card.Text>{event.description}</Card.Text>
                            <div className="registration-status">
                              <div className="capacity-bar">
                                <div className="capacity-fill" style={{ width: `${(event.registered / event.capacity) * 100}%` }}></div>
                              </div>
                              <div className="capacity-text">
                                {event.registered} of {event.capacity} spots filled
                              </div>
                            </div>
                            <div className="event-price">{event.price}</div>
                            <div className="card-actions">
                              <Button variant="primary" className="btn-register" onClick={() => handleEventShow(event)} disabled={event.registered >= event.capacity}>
                                {event.registered >= event.capacity ? 'Sold Out' : 'Get Tickets'} <i className="fas fa-ticket-alt"></i>
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Tab.Pane>
            <Tab.Pane eventKey="calendar">
              <div className="calendar-container">
                <EventCalendar events={eventsData} onEventSelect={handleEventShow} />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="past">
              <motion.div className="events-grid" variants={containerVariants} initial="hidden" animate="visible">
                <Row>
                  {pastEvents.map((event) => (
                    <Col md={6} lg={4} key={`past-event-${event.id}`}>
                      <motion.div className="event-card-wrapper" variants={itemVariants}>
                        <Card className="event-card past-event">
                          <div className="card-image-wrapper">
                            <Card.Img variant="top" src={event.image} />
                            <Badge className="category-badge">{event.category}</Badge>
                            {event.hasGallery && <Badge className="gallery-badge">Photo Gallery</Badge>}
                          </div>
                          <Card.Body>
                            <div className="card-meta">
                              <time>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                            </div>
                            <Card.Title>{event.title}</Card.Title>
                            <div className="location">
                              <i className="fas fa-map-marker-alt"></i> {event.location}
                            </div>
                            <Card.Text>{event.description}</Card.Text>
                            <div className="completed-banner">Event Completed</div>
                            <div className="card-actions">
                              <Button variant="outline-primary" className="btn-view-recap" onClick={() => handleEventShow(event)}>
                                View Recap <i className="fas fa-images"></i>
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="section-divider">
          <div className="divider-icon">
            <i className="fas fa-hat-wizard"></i>
          </div>
        </div>
        {/* Movie Section */}
        <div className="section-header">
          <h2 className="section-title">Featured Screenings</h2>
          <p className="section-subtitle">Experience the magic on the big screen with these special events</p>
        </div>
        <motion.div className="movie-grid" variants={containerVariants} initial="hidden" animate="visible">
          <Row>
            {blogData.slice(0, visibleItems).map((movie) => (
              <Col md={6} lg={4} key={movie.id}>
                <motion.div className="holder" variants={itemVariants}>
                  <Card className="blog-card">
                    <div className="card-image-wrapper">
                      <Card.Img variant="top" src={movie.image} />
                      <div className="card-overlay">
                        <Button variant="light" className="btn-play" onClick={() => setSelectedMovie(movie)}>
                          <i className="fas fa-play"></i>
                        </Button>
                      </div>
                      <Badge className="category-badge">{movie.category}</Badge>
                    </div>
                    <Card.Body>
                      <div className="card-meta">
                        <time>{movie.time}</time>
                        <span className="duration"><i className="far fa-clock"></i> {movie.duration}</span>
                        <span className="rating"><i className="fas fa-star"></i> {movie.rating}</span>
                      </div>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>{movie.description}</Card.Text>
                      <div className="card-actions">
                        <a href="#events" className="btn btn-primary">Get Tickets <i className="fas fa-ticket-alt"></i></a>
                        <Button variant="outline-secondary" className="btn-trailer" onClick={() => setSelectedMovie(movie)}>
                          <i className="fas fa-film"></i> Trailer
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* View All Button */}
        {blogData.length > visibleItems && (
          <div className="text-center mt-4">
            <Button variant="outline-light" className="btn-view-all" onClick={() => setVisibleItems(visibleItems === blogData.length ? 3 : blogData.length)}>
              {visibleItems === blogData.length ? 'Show Less' : 'View All Screenings'} <i className={`fas fa-chevron-${visibleItems === blogData.length ? 'up' : 'down'}`}></i>
            </Button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <h3>Stay Updated on Wizarding World News</h3>
              <p>Subscribe to our newsletter for exclusive content, early access tickets, and magical announcements</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="form-control" required />
                <Button type="submit" variant="primary">Subscribe <i className="fas fa-wand-sparkles"></i></Button>
              </form>
            </div>
          </div>
        </div>
      </Container>

      {/* Movie Trailer Modal */}
      <Modal show={!!selectedMovie} onHide={() => setSelectedMovie(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie?.title} - Official Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <div className="ratio ratio-16x9">
              <iframe src={selectedMovie.trailer} title={`${selectedMovie.title} trailer`} allowFullScreen></iframe>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedMovie(null)}>Close</Button>
          <Button variant="primary" href={selectedMovie?.link}>Get Tickets</Button>
        </Modal.Footer>
      </Modal>

      {/* Event Registration Modal */}
      <Modal show={showEventModal} onHide={() => setShowEventModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
              {!registrationComplete ? (
                <>
                  {selectedEvent.isPast ? (
                    <div className="event-recap">
                      <h4>Event Recap</h4>
                      <p>This magical event took place on {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedEvent.location}.</p>
                      {selectedEvent.hasGallery && (
                        <>
                          <h5>Event Gallery</h5>
                          <EventGallery images={selectedEvent.galleryImages} />
                        </>
                      )}
                      <div className="recap-footer">
                        <p>Thank you to all {selectedEvent.registered} wizards and witches who attended!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="registration-form-container">
                      <Row>
                        <Col md={5}>
                          <div className="event-details">
                            <img src={selectedEvent.image} alt={selectedEvent.title} className="img-fluid mb-3" />
                            <div className="detail-item">
                              <i className="fas fa-calendar-alt"></i>
                              <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="detail-item">
                              <i className="fas fa-clock"></i>
                              <span>{new Date(selectedEvent.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="detail-item">
                              <i className="fas fa-map-marker-alt"></i>
                              <span>{selectedEvent.location}</span>
                            </div>
                            <div className="detail-item">
                              <i className="fas fa-ticket-alt"></i>
                              <span>{selectedEvent.price} per person</span>
                            </div>
                            <div className="detail-item">
                              <i className="fas fa-users"></i>
                              <span>{selectedEvent.capacity - selectedEvent.registered} spots remaining</span>
                            </div>
                          </div>
                        </Col>
                        <Col md={7}>
                          <h4>Register for this Event</h4>
                          <Form onSubmit={handleRegistrationSubmit}>
                            <Form.Group className="mb-3">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control type="text" name="name" value={registrationData.name} onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" name="email" value={registrationData.email} onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control type="tel" name="phone" value={registrationData.phone} onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Number of Tickets</Form.Label>
                              <Form.Control type="number" name="tickets" min="1" max={selectedEvent.capacity - selectedEvent.registered} value={registrationData.tickets} onChange={(e) => setRegistrationData({ ...registrationData, tickets: e.target.value })} required />
                            </Form.Group>
                            <div className="total-price">
                              Total: ${(parseFloat(selectedEvent.price.replace('$', '')) * registrationData.tickets).toFixed(2)}
                            </div>
                            <Button variant="primary" type="submit" className="w-100">
                              Secure Your Spot
                            </Button>
                          </Form>
                        </Col>
                      </Row>
                    </div>
                  )}
                </>
              ) : (
                <div className="registration-success">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h4>Registration Successful!</h4>
                  <p>Thank you, {registrationData.name}! Your spot at "{selectedEvent.title}" has been secured.</p>
                  <div className="confirmation-details">
                    <div className="confirmation-item">
                      <span className="label">Event:</span>
                      <span className="value">{selectedEvent.title}</span>
                    </div>
                    <div className="confirmation-item">
                      <span className="label">Date:</span>
                      <span className="value">{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="confirmation-item">
                      <span className="label">Time:</span>
                      <span className="value">{new Date(selectedEvent.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="confirmation-item">
                      <span className="label">Location:</span>
                      <span className="value">{selectedEvent.location}</span>
                    </div>
                    <div className="confirmation-item">
                      <span className="label">Tickets:</span>
                      <span className="value">{registrationData.tickets}</span>
                    </div>
                    <div className="confirmation-item">
                      <span className="label">Total:</span>
                      <span className="value">${(parseFloat(selectedEvent.price.replace('$', '')) * registrationData.tickets).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default AppBlog;