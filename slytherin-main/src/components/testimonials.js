import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/testimonials.css';
var testimonialsData = [
  {
    id: 1,
    name: 'Ron Weasley',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur non earum repudiandae ipsa reprehenderit quaerat, quo a cupiditate, voluptatibus voluptates, dolores nam accusantium error, modi iure itaque totam labore.',
    designation: 'Auror'
  },
  {
    id: 2,
    name: 'Warid Bin Azad',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, magni fugiat eveniet minus perspiciatis! Nostrum laborum maxime consequuntur repellat nam magni, quae incidunt distinctio enim itaque eligendi laboriosam, quod, ad!',
    designation: 'Lecturer'
  },
  {
    id: 3,
    name: 'Samir Bin Abdul Karim',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium facilis optio porro omnis alias eaque corporis error est ut, reprehenderit quae asperiores illum quo voluptates debitis non. Repellat fugit, asperiores?',
    designation: 'Client (Reader)'
  }
]

function AppTestimonials() {
  return (
    <section id="testimonials" className="testimonials-block">
      <Container>
        <div className="title-holder">
          <h1>Client Feedback</h1>
          <div className="subtitle">--Wizarding Words - What Our Clients Say--</div>
        </div>
        <Carousel controls={false}>
          {
            testimonialsData.map(testimonials => {
              return (
                <Carousel.Item key={testimonials.id}>
                  <blockquote>
                    <p>{testimonials.description}</p>
                    <cite>
                      <span className='name'>{testimonials.name}</span>
                      <span className='designation'>{testimonials.designation}</span>
                    </cite>
                  </blockquote>             
                </Carousel.Item>
              );
            })
          }
        </Carousel>
      </Container>
    </section>
  );
}

export default AppTestimonials;