import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import img1 from '../assets/images/img1.jpg';
import img16 from '../assets/images/img16.jpg';
import '../styles/about.css';

function AppAbout() {
  const sectionRef = useRef(null);
  
  // House points state with historical data
  const [houses, setHouses] = useState([
    { 
      name: "Ravenclaw", 
      points: 285, 
      emoji: "🦅", 
      variant: "info", 
      trait: "Intelligence",
      history: [
        { month: "September", points: 210 },
        { month: "October", points: 245 },
        { month: "November", points: 285 }
      ]
    },
    { 
      name: "Gryffindor", 
      points: 267, 
      emoji: "🦁", 
      variant: "danger", 
      trait: "Bravery",
      history: [
        { month: "September", points: 230 },
        { month: "October", points: 256 },
        { month: "November", points: 267 }
      ]
    },
    { 
      name: "Slytherin", 
      points: 262, 
      emoji: "🐍", 
      variant: "success", 
      trait: "Ambition",
      history: [
        { month: "September", points: 195 },
        { month: "October", points: 245 },
        { month: "November", points: 262 }
      ]
    },
    { 
      name: "Hufflepuff", 
      points: 197, 
      emoji: "🦡", 
      variant: "warning", 
      trait: "Loyalty",
      history: [
        { month: "September", points: 180 },
        { month: "October", points: 187 },
        { month: "November", points: 197 }
      ]
    },
  ]);

  // User's selected house
  const [userHouse, setUserHouse] = useState(localStorage.getItem('userHouse') || '');
  
  // Modal states
  const [showSortingModal, setShowSortingModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  
  // Store user's house in localStorage
  useEffect(() => {
    if (userHouse) {
      localStorage.setItem('userHouse', userHouse);
    }
  }, [userHouse]);
  
  // Check if user has been sorted
  useEffect(() => {
    if (!userHouse && !localStorage.getItem('sortingShown')) {
      setTimeout(() => {
        setShowSortingModal(true);
        localStorage.setItem('sortingShown', 'true');
      }, 2000);
    }
  }, [userHouse]);

  // Add points to a house
  const addPoints = (houseName, pointsToAdd) => {
    setHouses(prevHouses => 
      prevHouses.map(house => 
        house.name === houseName 
          ? { 
              ...house, 
              points: house.points + pointsToAdd,
              history: [...house.history, 
                { 
                  month: new Date().toLocaleString('default', { month: 'long' }), 
                  points: house.points + pointsToAdd 
                }
              ] 
            } 
          : house
      )
    );
    
    setPointsEarned(pointsToAdd);
    setActivityCompleted(true);
    setTimeout(() => setShowPointsModal(false), 3000);
  };

  // Sort houses by points
  const sortedHouses = [...houses].sort((a, b) => b.points - a.points);
  
  // Choose house in sorting ceremony
  const chooseHouse = (houseName) => {
    setUserHouse(houseName);
    setShowSortingModal(false);
    
    // Add 5 welcome points to the chosen house
    addPoints(houseName, 5);
  };
  
  // Complete an activity
  const completeActivity = (activityPoints) => {
    if (userHouse) {
      addPoints(userHouse, activityPoints);
    } else {
      setShowSortingModal(true);
    }
  };
  
  // Calculate percentage for visual display
  const calculatePercentage = (points) => {
    const maxPoints = Math.max(...houses.map(h => h.points));
    return Math.round((points / maxPoints) * 100);
  };

  return (
    <section id="about" className="block about-block py-5" ref={sectionRef}>
      <Container>
        <div className="title-holder text-center mb-5 animate-on-scroll">
          <h1>HARRY POTTER BOOK DAY 2024</h1>
          <div className="subtitle">Celebrate the magic of Harry Potter with Bloomsbury • 17th October 2024</div>
        </div>

        <Row className="g-4 align-items-stretch">
          {/* Left Column */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm animate-on-scroll">
              <Card.Body className="p-4">
                <div className='img mb-4'>
                  <Card.Img
                    variant="top"
                    src={img1}
                    className="img-fluid rounded"
                    style={{ objectFit: 'cover', height: '400px', width: '100%' }}
                  />
                </div>
                
                {userHouse && (
                  <div className="user-house-badge mb-4 p-3 text-center">
                    <h4>Welcome to {userHouse}!</h4>
                    <p className="mb-0">
                      Earn points for your house by participating in activities.
                    </p>
                    <div className="mt-3">
                      <Button 
                        variant="primary" 
                        className="me-2"
                        style={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(228, 193, 61, 0.87)',
                        color: 'rgba(16, 16, 32, 0.97)',
                        fontSize: '1.1rem',
                        padding: '0.6rem 1.1rem',
                      }}
                        onClick={() => setShowPointsModal(true)}
                      >
                        Earn Points
                      </Button>
                      <Button 
                        variant="outline-secondary"
                        onClick={() => setShowSortingModal(true)}
                        style={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(228, 193, 61, 0.87)',
                        color: 'rgba(16, 16, 32, 0.97)',
                        fontSize: '1.1rem',
                        padding: '0.6rem 1.1rem',
                      }}
                      >
                        Change House
                      </Button>
                    </div>
                  </div>
                )}
                
                {!userHouse && (
                  <div className="user-house-badge mb-4 p-3 text-center">
                    <h4>You haven't been sorted yet!</h4>
                    <p className="mb-0">
                      Join a house to participate in activities and earn points.
                    </p>
                    <Button 
                      variant="primary" 
                      className="mt-3"
                      onClick={() => setShowSortingModal(true)}
                    >
                      Sorting Ceremony
                    </Button>
                  </div>
                )}
                
                <h3 className="mb-3">Harry Potter Book Day</h3>
                
                <p>
                  Harry Potter Book Day is a global celebration of J.K. Rowling's iconic series.
                  Bloomsbury creates a special free, downloadable event kit, packed with decoration,
                  costume, activity, and game ideas for magical celebrations worldwide.
                </p>

                <div className="info-badges mb-4">
                  <Badge bg="primary" className="me-2 p-2">Free Event Kit</Badge>
                  <Badge bg="secondary" className="me-2 p-2">Magical Activities</Badge>
                  <Badge bg="info" className="p-2">Global Event</Badge>
                </div>
                
                <h3 className="mb-3">Who can take part?</h3>
                <p>
                  Everyone! Whether you're a teacher, librarian, bookseller, parent, carer, or simply a fan,
                  Harry Potter Book Day is for you! Celebrate at home, in your school, library, bookshop, or anywhere magical.
                </p>

                <div className="event-details mt-4 p-3 rounded">
                  <h5 className="mb-3"><i className="fas fa-calendar-alt me-2"></i>Event Details</h5>
                  <p className="mb-2"><strong>Date:</strong> 17th October 2024</p>
                  <p className="mb-2"><strong>Event Kit:</strong> Available for download from Bloomsbury's website</p>
                  <p className="mb-0">
                    <strong>Social Media: </strong>
                    <a href="https://slytherine.netlify.app/" target="_blank" rel="noopener noreferrer" className="social-link">
                      slytherin.com
                    </a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm animate-on-scroll">
              <Card.Body className="p-4">
                <div className="theme-banner p-3 mb-4 text-center rounded">
                  <h4 className="mb-0">2024 Theme: Care of Magical Creatures</h4>
                </div>

                <div className="featured-creatures d-flex justify-content-between my-4">
                  <div className="creature text-center">
                    <div className="creature-icon mb-2">🦄</div>
                    <div className="creature-name">Unicorn</div>
                  </div>
                  <div className="creature text-center">
                    <div className="creature-icon mb-2">🐉</div>
                    <div className="creature-name">Dragon</div>
                  </div>
                  <div className="creature text-center">
                    <div className="creature-icon mb-2">🦅</div>
                    <div className="creature-name">Hippogriff</div>
                  </div>
                  <div className="creature text-center">
                    <div className="creature-icon mb-2">🦊</div>
                    <div className="creature-name">Niffler</div>
                  </div>
                </div>

                <div className="leaderboard-container">
                  <h3 className="text-center mb-4">
                    <b>House Points Leaderboard 🏆</b>
                    <Button 
                      variant="link" 
                      className="history-link ms-2"
                      style={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(228, 193, 61, 0.97)',
                        color: 'rgba(16, 16, 32, 0.97)',
                        fontSize: '1.1rem',
                        padding: '0.7rem 1.3rem',
                      }}
                      onClick={() => setShowHistoryModal(true)}
                    >
                    <i className="fas fa-history"></i> History
                    </Button>
                  </h3>
                  
                  {sortedHouses.map((house, index) => (
                    <div key={index} className="mb-4 position-relative house-progress">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">
                          {index === 0 && <span className="position-badge">🥇</span>}
                          {index === 1 && <span className="position-badge">🥈</span>}
                          {index === 2 && <span className="position-badge">🥉</span>}
                          {house.emoji} {house.name}
                          {house.name === userHouse && <span className="user-house-indicator ms-2">★</span>}
                        </span>
                        <span>{house.points} pts</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className={`progress progress-${house.name.toLowerCase()}`}
                          style={{ width: `${calculatePercentage(house.points)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className='img mt-4'>
                  <Image
                    src={img16}
                    className="img-fluid rounded-3 shadow"
                    style={{ objectFit: 'cover', height: '300px', width: '100%' }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Sorting Modal */}
      <Modal show={showSortingModal} onHide={() => setShowSortingModal(false)} centered>
        <Modal.Header closeButton className="sorting-modal-header">
          <Modal.Title>Hogwarts Sorting Ceremony</Modal.Title>
        </Modal.Header>
        <Modal.Body className="sorting-modal-body">
          <p className="text-center mb-4">Choose your Hogwarts house to begin earning points!</p>
          
          <div className="house-selection">
            {houses.map((house, index) => (
              <div 
                key={index} 
                className={`house-option ${userHouse === house.name ? 'selected' : ''}`}
                onClick={() => chooseHouse(house.name)}
              >
                <div className="house-emoji">{house.emoji}</div>
                <h5>{house.name}</h5>
                <p>{house.trait}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      
      {/* Points Modal */}
      <Modal show={showPointsModal} onHide={() => {
        setShowPointsModal(false);
        setActivityCompleted(false);
        setPointsEarned(0);
      }} centered>
        <Modal.Header closeButton className="points-modal-header">
          <Modal.Title>Earn Points for {userHouse}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="points-modal-body">
          {!activityCompleted ? (
            <>
              <p className="text-center mb-4">Complete magical activities to earn points for your house!</p>
              
              <div className="activity-list">
                <div className="activity-item" onClick={() => completeActivity(5)}>
                  <div className="activity-icon">📝</div>
                  <div className="activity-details">
                    <h5>Take a magical quiz</h5>
                    <p>Test your Harry Potter knowledge</p>
                    <span className="points-value">+5 points</span>
                  </div>
                </div>
                
                <div className="activity-item" onClick={() => completeActivity(10)}>
                  <div className="activity-icon">🪄</div>
                  <div className="activity-details">
                    <h5>Master a spell</h5>
                    <p>Learn and practice a new incantation</p>
                    <span className="points-value">+10 points</span>
                  </div>
                </div>
                
                <div className="activity-item" onClick={() => completeActivity(15)}>
                  <div className="activity-icon">🧪</div>
                  <div className="activity-details">
                    <h5>Brew a potion</h5>
                    <p>Follow the instructions to create a magical concoction</p>
                    <span className="points-value">+15 points</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="points-earned text-center">
              <div className="points-badge">+{pointsEarned}</div>
              <h4>Points awarded to {userHouse}!</h4>
              <p>Well done! Your house has earned {pointsEarned} points.</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      
      {/* History Modal */}
      <Modal 
        show={showHistoryModal} 
        onHide={() => setShowHistoryModal(false)} 
        centered
        size="lg"
      >
        <Modal.Header closeButton className="history-modal-header">
          <Modal.Title>House Points History</Modal.Title>
        </Modal.Header>
        <Modal.Body className="history-modal-body">
          <Tab.Container defaultActiveKey="monthly">
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="monthly">Monthly Progress</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="past-winners">Past Winners</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Tab.Content>
              <Tab.Pane eventKey="monthly">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>House</th>
                      {houses[0].history.map((entry, i) => (
                        <th key={i}>{entry.month}</th>
                      ))}
                      <th>Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    {houses.map((house, index) => (
                      <tr key={index} className={`house-${house.name.toLowerCase()}-row`}>
                        <td className="house-name">
                          <span className="house-emoji">{house.emoji}</span> {house.name}
                        </td>
                        {house.history.map((entry, i) => (
                          <td key={i}>{entry.points}</td>
                        ))}
                        <td className="current-points">{house.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tab.Pane>
              
              <Tab.Pane eventKey="past-winners">
                <div className="past-winners">
                  <div className="year-winner">
                    <div className="year">2023</div>
                    <div className="winner">
                      <span className="house-emoji">🦁</span> Gryffindor
                      <span className="trophy">🏆</span>
                    </div>
                    <div className="points">967 points</div>
                  </div>
                  
                  <div className="year-winner">
                    <div className="year">2022</div>
                    <div className="winner">
                      <span className="house-emoji">🐍</span> Slytherin
                      <span className="trophy">🏆</span>
                    </div>
                    <div className="points">945 points</div>
                  </div>
                  
                  <div className="year-winner">
                    <div className="year">2021</div>
                    <div className="winner">
                      <span className="house-emoji">🦅</span> Ravenclaw
                      <span className="trophy">🏆</span>
                    </div>
                    <div className="points">978 points</div>
                  </div>
                  
                  <div className="year-winner">
                    <div className="year">2020</div>
                    <div className="winner">
                      <span className="house-emoji">🦡</span> Hufflepuff
                      <span className="trophy">🏆</span>
                    </div>
                    <div className="points">921 points</div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default AppAbout;