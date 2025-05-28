import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import '../styles/footer.css';

function AppFooter() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
      window.addEventListener("scroll", () => {
          if (window.scrollY > 400) {
              setShowTopBtn(true);
          } else {
              setShowTopBtn(false);
          }
      });
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className="footer-block">
      <Container>
        <div className="footer-content">
          <div className="copyright">
            &copy; yamin401533 2024 slytherin. All Rights Reserved.
          </div>
          <div className="socials">
            <ul>
              <li><a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a></li>
              <li><a href="https://www.linkedin.com/in/yamin401533"><i className="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
        {showTopBtn && (
          <div className="go-top" onClick={goTop}>
            <i className="fas fa-chevron-up"></i>
          </div>
        )}
      </Container>
    </footer>
  )
}

export default AppFooter;