import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/contact.css';
function AppContact() {
  return (
    <section id="contact" className="block contact-block">
      <Container>
        <div className="title-holder">
          <h1>Contact us</h1>
          <div className="subtitle">Get connected with us</div>
        </div>
        <Form className='contact-form'>
          <Row>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Enter your full name" required />
            </Col>
            <Col sm={4}>
              <Form.Control type="email" placeholder="Enter your email address" required />
            </Col>
            <Col sm={4}>
              <Form.Control type="tel" placeholder="Enter your contact number" required />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Form.Control as="textarea" placeholder="Enter your contact message" required />
            </Col>
          </Row>
          <div className='btn-holder'>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
      
      <Container>
        <div className='contact-info'>
          <ul>
            <li>
              <i className="fas fa-envelope"></i>
              ashabulyamintuhin@gmail.com
            </li>
            <li>
              <i className="fas fa-phone"></i>
              000-000-0000
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              Patiya, Chittagong, Bangladesh
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default AppContact;