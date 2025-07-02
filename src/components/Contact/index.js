import React from 'react';
import './index.scss';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'react-loaders';
import 'loaders.css/loaders.min.css'; 

const AboutAndContact = () => (
  <>
  <div className="about-page-card">

    <div className="about-right">
      <h1>Hey, I’m Dhyani</h1>
      <p>
       I’m someone who finds meaning at the intersection of people and technology. I don’t just build projects, I craft tools that solve real problems and leave a positive mark. 

I value clarity, creativity, and compassion; not just in code, but in communication, teamwork, and how I show up in the world. I love exploring where data meets design, and I’m especially drawn to problems that blend structure with storytelling, making science more accessible.

Outside of my screen, I’m a big fan of tennis, long walks with music, and thinking about how the smallest ideas like a line of code or a research question can scale to something unexpectedly impactful.

I’m here to keep learning, keep building, and hopefully, keep making something that matters.
      </p>

      <hr />

      <h2>Education</h2>
      <p>BSc in Computer Science — New Jersey Institute of Technology</p>

      <hr />
      <div className="activities-section">
        <h2>Activities & Leadership</h2>
        <p>
          I actively lead and contribute to student organizations focused on equity, education, and computer science outreach.
        </p>
        <ul className="activities-list">
          <li><strong>Outreach Chair, Girl Up NJIT:</strong> Lead university-wide campaigns and organize events to promote gender equity and empowerment through tech-driven initiatives.</li>
          <li><strong>Curriculum Manager, Lyra STEM:</strong> Design and manage engaging STEM lesson plans for high and elementary school students that make complex concepts accessible and fun.</li>
          <li><strong>Treasurer, Kids Who Code:</strong> Oversee club finances, funding, and event planning to expand youth access to hands-on coding education.</li>
        </ul>
      </div>

      <hr />


    <h2 style={{ textAlign: 'center' }}>Contact & Links</h2>
      <ul className="contact-links">
        <li><a target='_blank' rel="noreferrer" href="mailto:dhyanisoni05@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
                   &nbsp;Email Me
            </a>
        </li>
        <li><a target='_blank' rel="noreferrer" href="https://github.com/dhy-ani">
                <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
                   &nbsp;GitHub
            </a>
        </li>
        <li><a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/dhyani-soni">
                <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
                   &nbsp;LinkedIn
            </a>
        </li>
      </ul>
    </div>
  </div>
      <Loader type="ball-scale-multiple" active/>
    </>
);

export default AboutAndContact