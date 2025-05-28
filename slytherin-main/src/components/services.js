import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import '../styles/services.css';

const magicalCreaturesData = [
  {
    id: 1,
    icon: "🐍",
    title: "Basilisk",
    shortDescription: "The King of Serpents with a deadly gaze and venomous fangs",
    description: "The Basilisk, known as the King of Serpents, is a giant serpent capable of living for centuries. Its deadly gaze and venomous fangs make it one of the most feared creatures in the wizarding world. It was famously unleashed in the Chamber of Secrets by the Heir of Slytherin.",
    traits: ["Deadly Gaze", "Venomous", "Long-lived"],
    color: "rgba(87, 61, 131, 0.95)",
  },
  {
    id: 2,
    icon: "🦅",
    title: "Hippogriff",
    shortDescription: "Majestic creatures with eagle front and horse hind",
    description: "Hippogriffs are majestic creatures with the front half of an eagle and the hind half of a horse. They are proud and noble, requiring proper respect. Buckbeak, a Hippogriff, played a key role in the events of the Prisoner of Azkaban.",
    traits: ["Proud", "Noble", "Loyal"],
    color: "rgba(55, 37, 87, 0.95)",
  },
  {
    id: 3,
    icon: "🐉",
    title: "Hungarian Horntail",
    shortDescription: "One of the most dangerous dragon species",
    description: "The Hungarian Horntail is one of the most dangerous dragon species, known for its aggressive nature. With black scales, bronze horns, and a spiked tail, it posed a significant challenge to Harry Potter during the Triwizard Tournament.",
    traits: ["Aggressive", "Powerful", "Territorial"],
    color: "rgba(89, 66, 129, 0.95)",
  },
  {
    id: 4,
    icon: "🦇",
    title: "Thestral",
    shortDescription: "Skeletal horses visible only to those who've witnessed death",
    description: "Thestrals are winged, skeletal horses visible only to those who have witnessed death. Despite their eerie appearance, they are gentle and loyal creatures, often used to pull the carriages at Hogwarts.",
    traits: ["Mysterious", "Gentle", "Perceptive"],
    color: "rgba(55, 37, 87, 0.95)",
  },
  {
    id: 5,
    icon: "🦑",
    title: "Giant Squid",
    shortDescription: "Peaceful resident of the Black Lake near Hogwarts",
    description: "The Giant Squid resides in the Black Lake near Hogwarts. A peaceful creature, it occasionally interacts with students and is a beloved part of the Hogwarts ecosystem.",
    traits: ["Peaceful", "Intelligent", "Aquatic"],
    color: "rgba(87, 65, 124, 0.95)",
  },
  {
    id: 6,
    icon: "🦠",
    title: "Acromantula",
    shortDescription: "Giant spiders capable of human speech",
    description: "Acromantulas are giant, sentient spiders capable of human speech. Bred to guard wizarding dwellings, they are highly dangerous. Aragog, an Acromantula, was raised by Rubeus Hagrid and lived in the Forbidden Forest.",
    traits: ["Sentient", "Dangerous", "Colony-dwelling"],
    color: "rgba(55, 37, 87, 0.95)",
  },
];

function AppServices() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [filterTrait, setFilterTrait] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (creature) => {
    setSelectedCreature(creature);
    setShowModal(true);
  };

  // Get all unique traits
  const allTraits = [...new Set(magicalCreaturesData.flatMap(creature => creature.traits))];
  
  // Filter creatures by trait if filter is active
  const displayedCreatures = filterTrait 
    ? magicalCreaturesData.filter(creature => creature.traits.includes(filterTrait))
    : magicalCreaturesData;

  return (
    <section id="services" className="block services-block">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <Container>
        <div className="title-holder">
          <h1>Magical Creatures of Slytherin</h1>
          <div className="subtitle">Explore the Enigmatic Beasts of the Wizarding World</div>
        </div>
        
        <div className="intro-text-container">
          <p className="intro-text">
            Slytherin House is renowned for its connection to some of the most fascinating and mysterious creatures 
            in the wizarding world. From the deadly Basilisk to the noble Hippogriff, these magical beings embody 
            the cunning, ambition, and resourcefulness that define Slytherin.
          </p>
        </div>
        <h4 className="filter-title">Filter by trait:</h4>
        <div className="filter-container">
          
          <div className="trait-filters">
            <Badge 
              className={`trait-badge ${filterTrait === null ? 'active' : ''}`} 
              onClick={() => setFilterTrait(null)}
            >
              All
            </Badge>
            {allTraits.map(trait => (
              <Badge 
                key={trait} 
                className={`trait-badge ${filterTrait === trait ? 'active' : ''}`}
                onClick={() => setFilterTrait(trait === filterTrait ? null : trait)}
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        <Row className="creatures-container">
          {displayedCreatures.map((creature) => (
            <Col lg={4} md={6} className="creature-col" key={creature.id}>
              <Card 
                className="creature-card" 
                onClick={() => handleShow(creature)}
                style={{ borderColor: creature.color }}
              >
                <div className="card-icon-wrapper" style={{ backgroundColor: creature.color }}>
                  <span className="card-icon">{creature.icon}</span>
                </div>
                <Card.Body>
                  <Card.Title className="creature-title">{creature.title}</Card.Title>
                  <Card.Text className="creature-short-desc">{creature.shortDescription}</Card.Text>
                  <div className="traits-container">
                    {creature.traits.map((trait, index) => (
                      <span key={index} className="trait-tag">{trait}</span>
                    ))}
                  </div>
                  <Button variant="outline-light" className="learn-more-btn">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enhanced Modal for detailed information */}
      <Modal 
        show={showModal} 
        onHide={handleClose} 
        centered 
        size="lg" 
        className="creature-modal"
      >
        <Modal.Header closeButton style={{ backgroundColor: selectedCreature?.color }}>
          <div className="modal-header-content">
            <span className="modal-icon">{selectedCreature?.icon}</span>
            <Modal.Title>{selectedCreature?.title}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="creature-description">{selectedCreature?.description}</p>
          <h5 className="traits-heading">Notable Traits:</h5>
          <div className="modal-traits">
            {selectedCreature?.traits.map((trait, index) => (
              <Badge key={index} className="modal-trait-badge">{trait}</Badge>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            style={{ backgroundColor: selectedCreature?.color, borderColor: selectedCreature?.color }}
          >
            Add to Favorites
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default AppServices;