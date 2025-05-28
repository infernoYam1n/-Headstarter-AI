import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/teams.css';

// House data for more detailed and consistent representation
const houseData = {
  G: {
    name: 'Gryffindor',
    color: '#740001',
    secondaryColor: '#d3a625',
    icon: 'fa-lion', // Using FontAwesome icons
    motto: 'Courage and Bravery'
  },
  S: {
    name: 'Slytherin',
    color: '#1a472a',
    secondaryColor: '#5d5d5d',
    icon: 'fa-snake',
    motto: 'Ambition and Cunning'
  },
  R: {
    name: 'Ravenclaw',
    color: '#0e1a40',
    secondaryColor: '#946b2d',
    icon: 'fa-eagle',
    motto: 'Wit and Learning'
  },
  H: {
    name: 'Hufflepuff',
    color: '#ecb939',
    secondaryColor: '#372e29',
    icon: 'fa-badger',
    motto: 'Loyalty and Hard Work'
  }
};

// Extended team data with more professional information
const teamsData = [
  {
    id: 1,
    image: require('../assets/images/team1.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com/harrypotter',
      twitter: 'https://www.twitter.com/harrypotter',
      linkedin: 'https://www.linkedin.com/in/harrypotter',
      instagram: 'https://www.instagram.com/harrypotter'
    },
    name: 'Harry James Potter',
    designation: 'Head of British Auror Office',
    description: '',
    extendedBio: 'After his triumph over Lord Voldemort in the Battle of Hogwarts, Harry joined the Ministry of Magic as an Auror, quickly rising through the ranks. His expertise in Defense Against the Dark Arts and natural leadership abilities led to his appointment as Head of the Auror Office. He implemented revolutionary training programs based on his experience with Dumbledore\'s Army and maintains close ties with Hogwarts to identify promising candidates.',
    skills: ['Defense Against Dark Arts', 'Leadership', 'Flying', 'Parseltongue (formerly)'],
    achievements: ['Order of Merlin, First Class', 'Youngest Seeker in a Century', 'Triwizard Champion'],
    house: 'G',
    graduationYear: '1998',
    featured: true
  },
  {
    id: 2,
    image: require('../assets/images/team2.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com/hermionegranger',
      twitter: 'https://www.twitter.com/hermionegranger',
      linkedin: 'https://www.linkedin.com/in/hermionegranger',
      instagram: 'https://www.instagram.com/hermionegranger'
    },
    name: 'Hermione Granger',
    designation: 'Head of Magical Law Enforcement',
    description: '',
    extendedBio: 'Hermione\'s exceptional academic achievements and commitment to justice have propelled her to become the youngest Head of Magical Law Enforcement in history. She spearheaded the reformation of laws regarding house-elves and other magical creatures, establishing the Department for the Welfare of Magical Beings. Her groundbreaking work on integrating Muggle-born witches and wizards has earned her international recognition.',
    skills: ['Charms', 'Potions', 'Ancient Runes', 'Magical Law', 'Research'],
    achievements: ['Order of Merlin, First Class', 'Author of "Modern Magical Law Reform"', 'S.P.E.W. Founder'],
    house: 'G',
    graduationYear: '1998',
    featured: true
  },
  {
    id: 3,
    image: require('../assets/images/team3.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com/ronweasley',
      twitter: 'https://www.twitter.com/ronweasley',
      linkedin: 'https://www.linkedin.com/in/ronweasley',
      instagram: 'https://www.instagram.com/ronweasley'
    },
    name: 'Ron Weasley',
    designation: 'Chief Strategy Officer, Weasleys Wizard Wheezes',
    description: '',
    extendedBio: 'After a distinguished career in the Auror Office alongside Harry Potter, Ron joined his brother George at Weasleys Wizard Wheezes. His strategic mind and business acumen expanded the company from a single Diagon Alley location to an international chain with products distributed worldwide. Ron oversees product development and global expansion, combining his combat experience with entrepreneurial vision.',
    skills: ['Strategic Planning', 'Wizard Chess', 'Business Management', 'Combat Magic'],
    achievements: ['Order of Merlin, First Class', 'Wizard Chess Champion', 'Quidditch Keeper'],
    house: 'G',
    graduationYear: '1998',
    featured: true
  },
  {
    id: 4,
    image: require('../assets/images/team4.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com/ginnyweasley',
      twitter: 'https://www.twitter.com/ginnyweasley',
      linkedin: 'https://www.linkedin.com/in/ginnyweasley',
      instagram: 'https://www.instagram.com/ginnyweasley'
    },
    name: 'Ginny Weasley',
    designation: 'Sports Editor, Daily Prophet',
    description: '',
    extendedBio: 'After a stellar career with the Holyhead Harpies that included three league championships, Ginny transitioned to sports journalism. Her unique player perspective and insightful analysis quickly elevated her to Sports Editor at the Daily Prophet. She has pioneered interactive match coverage and developed the first wireless broadcasting network dedicated to Quidditch matches worldwide.',
    skills: ['Quidditch', 'Journalism', 'Bat-Bogey Hex', 'Public Speaking'],
    achievements: ['Quidditch World Cup Correspondent', 'Three-time League Champion', 'Youngest Daily Prophet Editor'],
    house: 'G',
    graduationYear: '1999',
    featured: false
  },
  {
    id: 5,
    image: require('../assets/images/team5.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com/nevillelongbottom',
      twitter: 'https://www.twitter.com/nevillelongbottom',
      linkedin: 'https://www.linkedin.com/in/nevillelongbottom',
      instagram: 'https://www.instagram.com/nevillelongbottom'
    },
    name: 'Neville Longbottom',
    designation: 'Professor of Herbology, Hogwarts',
    description: '',
    extendedBio: 'Professor Longbottom has made Herbology one of Hogwarts\' most popular subjects through his hands-on teaching approach and enthusiasm. His research on rare magical plants has led to breakthroughs in healing potions and defensive applications. He maintains the largest collection of magical Mediterranean plants in Britain and co-authored "Magical Water Plants of the Highland Lochs" with Luna Lovegood.',
    skills: ['Herbology', 'Sword of Gryffindor Wielding', 'Defense Against Dark Arts', 'Teaching'],
    achievements: ['Order of Merlin, First Class', 'Royal Herbological Society Fellow', 'Battle of Hogwarts Hero'],
    house: 'G',
    graduationYear: '1998',
    featured: false
  },
  {
    id: 6,
    image: require('../assets/images/team6.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com/lunalovegood',
      twitter: 'https://www.twitter.com/lunalovegood',
      linkedin: 'https://www.linkedin.com/in/lunalovegood',
      instagram: 'https://www.instagram.com/lunalovegood'
    },
    name: 'Luna Lovegood',
    designation: 'Lead Magizoologist, Scamander Foundation',
    description: '',
    extendedBio: 'Luna\'s unconventional approaches to magizoology have led to remarkable discoveries, including verification of several creatures once dismissed as imaginary. As head researcher at the Scamander Foundation, she leads international expeditions and has established conservation programs for rare magical species. Her quarterly magazine "The Quibbler" has evolved into a respected scientific journal under her editorship.',
    skills: ['Magical Creature Identification', 'Thestral Communication', 'Advanced Charms', 'Expedition Leadership'],
    achievements: ['Scamander Medal for Magical Discovery', 'First documented sighting of Crumple-Horned Snorkack', 'Conservation Pioneer Award'],
    house: 'R',
    graduationYear: '1999',
    featured: false
  },
  {
    id: 7,
    image: require('../assets/images/team7.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com',
      twitter: 'https://www.twitter.com',
      linkedin: 'https://www.linkedin.com',
      instagram: 'https://www.instagram.com'
    },
    name: 'Tom Riddle ',
    designation: 'Historical Figure (Deceased)',
    description: '',
    extendedBio: 'Tom Marvolo Riddle, who later styled himself as Lord Voldemort, remains the subject of extensive historical study at the Department of Mysteries. His unprecedented use of Horcruxes and command of forbidden magic has informed current detection and defense strategies. The Voldemort Era (1970-1998) is now a required course component in advanced Defense Against the Dark Arts curriculum worldwide.',
    skills: ['Dark Arts', 'Legilimency', 'Parseltongue', 'Wandless Magic'],
    achievements: ['Most Feared Dark Wizard of All Time', 'Slytherin Prefect', 'Special Services to Hogwarts Award (revoked)'],
    house: 'S',
    graduationYear: '1945',
    featured: false
  },
  {
    id: 8,
    image: require('../assets/images/team8.jpg'),
    socialLinks: {
      facebook: 'https://www.facebook.com/dracomalfoy',
      twitter: 'https://www.twitter.com/dracomalfoy',
      linkedin: 'https://www.linkedin.com/in/dracomalfoy',
      instagram: 'https://www.instagram.com/dracomalfoy'
    },
    name: 'Draco Malfoy',
    designation: 'Senior Unspeakable, Department of Mysteries',
    description: '',
    extendedBio: 'After the Second Wizarding War, Draco dedicated himself to redemption through service. His unique insight into dark artifacts made him invaluable to the Department of Mysteries, where he now leads the Experimental Charms division. His work has neutralized numerous dangerous objects from the Voldemort era. Draco also anonymously funds scholarships for children affected by the war, regardless of their blood status or family affiliations.',
    skills: ['Potions', 'Occlumency', 'Artifact Analysis', 'Dark Magic Neutralization'],
    achievements: ['Flamel Prize for Magical Research', 'Developer of counter-curse techniques', 'Ministry Special Commendation'],
    house: 'S',
    graduationYear: '1998',
    featured: false
  }
];

function AppTeams() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterHouse, setFilterHouse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeams, setFilteredTeams] = useState(teamsData);
  const [activeSort, setActiveSort] = useState('featured');

  // Filter and sort the teams data
  useEffect(() => {
    let result = [...teamsData];
    
    // Apply house filter
    if (filterHouse) {
      result = result.filter(member => member.house === filterHouse);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(member => 
        member.name.toLowerCase().includes(term) || 
        member.designation.toLowerCase().includes(term) ||
        member.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    switch(activeSort) {
      case 'featured':
        result.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'house':
        result.sort((a, b) => a.house.localeCompare(b.house));
        break;
      case 'recent':
        result.sort((a, b) => parseInt(b.graduationYear) - parseInt(a.graduationYear));
        break;
      default:
        break;
    }
    
    setFilteredTeams(result);
  }, [filterHouse, searchTerm, activeSort]);

  // Open modal with member details
  const handleShowModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to get house badge background
  const getHouseBadgeStyle = (house) => {
    if (house && houseData[house]) {
      return { 
        backgroundColor: houseData[house].color,
        borderRight: `3px solid ${houseData[house].secondaryColor}`
      };
    }
    return { backgroundColor: '#6a0dad' };
  };

  // Render house filter options
  const renderHouseFilters = () => {
    return (
      <div className="house-filters">
        <Button 
          variant={filterHouse === '' ? "primary" : "outline-primary"} 
          onClick={() => setFilterHouse('')}
          className="filter-btn"
        >
          All Houses
        </Button>
        {Object.keys(houseData).map(houseKey => (
          <Button 
            key={houseKey}
            variant={filterHouse === houseKey ? "primary" : "outline-primary"}
            onClick={() => setFilterHouse(houseKey)}
            className="filter-btn"
            style={{
              borderColor: houseData[houseKey].color,
              color: filterHouse === houseKey ? 'white' : houseData[houseKey].color,
              backgroundColor: filterHouse === houseKey ? houseData[houseKey].color : 'transparent'
            }}
          >
            {houseData[houseKey].name}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <section id="teams" className="block teams-block">
      <Container>
        <div className="title-holder">
          <h1>Wizarding World Professionals</h1>
          <div className="subtitle">Harry Potter & Distinguished Associates</div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="controls-wrapper">
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by name, position, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <div className="sort-options">
                <span className="me-2">Sort by:</span>
                <Button 
                  variant={activeSort === 'featured' ? "primary" : "outline-primary"} 
                  onClick={() => setActiveSort('featured')}
                  className="sort-btn"
                >
                  Featured
                </Button>
                <Button 
                  variant={activeSort === 'name' ? "primary" : "outline-primary"} 
                  onClick={() => setActiveSort('name')}
                  className="sort-btn"
                >
                  Name
                </Button>
                <Button 
                  variant={activeSort === 'house' ? "primary" : "outline-primary"} 
                  onClick={() => setActiveSort('house')}
                  className="sort-btn"
                >
                  House
                </Button>
                <Button 
                  variant={activeSort === 'recent' ? "primary" : "outline-primary"} 
                  onClick={() => setActiveSort('recent')}
                  className="sort-btn"
                >
                  Recent Grads
                </Button>
              </div>
            </Col>
          </Row>
          
          {/* House Filters */}
          <Row className="mb-4">
            <Col>
              {renderHouseFilters()}
            </Col>
          </Row>
        </div>
        
        {/* Results Count */}
        <div className="results-count mb-4">
          Showing {filteredTeams.length} of {teamsData.length} team members
        </div>
        
        {/* Team Cards */}
        <Row>
          {filteredTeams.length > 0 ? (
            filteredTeams.map(member => (
              <Col md={6} lg={3} key={member.id}>
                <div className={`team-card ${member.featured ? 'featured' : ''}`}>
                  <div className='image'>
                    <Image src={member.image} fluid />
                    <div className='overlay'>
                      <div className='socials'>
                        <ul>
                          {Object.entries(member.socialLinks).map(([platform, link]) => (
                            <li key={platform}>
                              <a href={link} target="_blank" rel="noopener noreferrer">
                                <i className={`fab fa-${platform}`}></i>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        variant="light" 
                        className="view-profile-btn"
                        onClick={() => handleShowModal(member)}
                      >
                        View Profile
                      </Button>
                    </div>
                    {member.house && (
                      <div 
                        className='house-badge' 
                        style={getHouseBadgeStyle(member.house)}
                        title={houseData[member.house]?.name}
                      >
                        <span>{member.house}</span>
                      </div>
                    )}
                    {member.featured && (
                      <div className="featured-badge">
                        <i className="fas fa-star"></i>
                      </div>
                    )}
                  </div>
                  <div className='content'>
                    <h3>{member.name}</h3>
                    <span className='designation'>{member.designation}</span>
                    <p>{member.description}</p>
                    <Button 
                      variant="outline-primary" 
                      className="details-btn"
                      onClick={() => handleShowModal(member)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Col>
              <div className="no-results">
                <i className="fas fa-search fa-3x mb-3"></i>
                <h3>No matches found</h3>
                <p>Try adjusting your search or filters</p>
                <Button variant="primary" onClick={() => {
                  setFilterHouse('');
                  setSearchTerm('');
                }}>
                  Reset Filters
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
      
      {/* Detailed Profile Modal */}
      {selectedMember && (
        <Modal 
          show={showModal} 
          onHide={handleCloseModal}
          size="lg"
          centered
          className="profile-modal"
        >
          <Modal.Header 
            closeButton
            style={selectedMember.house ? {
              backgroundImage: `linear-gradient(135deg, ${houseData[selectedMember.house].color} 0%, ${houseData[selectedMember.house].secondaryColor} 100%)`
            } : {}}
          >
            <Modal.Title className="text-white">
              {selectedMember.name}
              {selectedMember.house && (
                <span className="house-name-badge ms-2">
                  {houseData[selectedMember.house].name}
                </span>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={4}>
                <div className="profile-image">
                  <Image src={selectedMember.image} fluid rounded />
                </div>
                <div className="profile-info mt-3">
                  <h4>{selectedMember.designation}</h4>
                  <p><strong>Graduation:</strong> {selectedMember.graduationYear}</p>
                  <div className="social-links">
                    {Object.entries(selectedMember.socialLinks).map(([platform, link]) => (
                      <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className={`fab fa-${platform}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className="profile-details">
                  <h4>Biography</h4>
                  <p>{selectedMember.extendedBio}</p>
                  
                  <h4>Skills</h4>
                  <div className="skills-container">
                    {selectedMember.skills.map((skill, index) => (
                      <span key={index} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                  
                  <h4>Achievements</h4>
                  <ul className="achievements-list">
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
}

export default AppTeams;