import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppHeader from './components/header';
import AppHero from './components/hero';
import AppAbout from './components/about';
import AppServices from './components/services';
import AppTeams from './components/teams';
import AppBlog from './components/blog';
import AppGame from './components/games';  
import AppBooks from './components/books';
import AppPricing from './components/pricing';
import AppTestimonials from './components/testimonials';
import AppContact from './components/contact';
import AppFooter from './components/footer';
import AppFanCreations from './components/fan';


function App() {
  return (
    <div className="App">
      <header id='header'>
        <AppHeader />
      </header>
      <main>
        <AppHero />
        <AppAbout />
        <AppServices />
        <AppBooks />
        <AppBlog />
        <AppGame />
        <AppFanCreations />
        <AppPricing />
        <AppTeams />
        <AppTestimonials />
        <AppContact />
      </main>
      <footer id="footer">
        <AppFooter />
      </footer>
    </div>
  );
}

export default App;