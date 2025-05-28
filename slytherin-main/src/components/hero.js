import Carousel from 'react-bootstrap/Carousel';
import '../styles/hero.css';

const heroData = [
  {
    id: 1,
    image: require('../assets/images/img-hero3.jpg'),
    title: 'Harry Potter',
    description: 'Explore the Wizarding World of J.K. Rowling — The Harry Potter series. Buy the books, play the games, discover the magic.',
    link: '#about',
  },
  {
    id: 2,
    image: require('../assets/images/img-hero2.jpg'),
    title: 'Gryffindor',
    description: 'Bravery, courage, and determination define Gryffindor. Join the house of the brave and explore the magic of Hogwarts.',
    link: '#about',
  },
  {
    id: 3,
    image: require('../assets/images/img-hero1.jpg'),
    title: '',
    description: '',
    link: '#about',
  },
];

function AppHero() {
  return (
    <section id="home" className="hero-block">
      <Carousel>
        {heroData.map((hero) => (
          <Carousel.Item key={hero.id}>
            <img
              className="d-block w-100"
              src={hero.image}
              alt={`Slide ${hero.id}`}
            />
            <Carousel.Caption>
              <div className="caption-content">
                <h2>{hero.title}</h2>
                <p>{hero.description}</p>
                <a className="btn btn-primary" href={hero.link}>
                  Learn More <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default AppHero;