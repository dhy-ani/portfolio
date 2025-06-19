import React from 'react';
import './index.scss';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AboutAndContact = () => (
  <div className="about-page-card">

    <div className="about-right">
      <h1>Hey, I’m Dhyani</h1>
      <p>
       I’m someone who finds meaning at the intersection of people and technology. I don’t just build projects — I craft tools that solve real problems and leave a positive mark. Whether I’m training AI models to recommend skincare products or designing a fashion trend engine using embeddings and clustering, what drives me is curiosity and the desire to help people feel seen, heard, and understood.

I value clarity, creativity, and compassion — not just in code, but in communication, teamwork, and how I show up in the world. I love exploring where data meets design, and I’m especially drawn to problems that blend structure with storytelling — like visualizing global risk, making science more accessible, or mapping trends across cultures.

Outside of my screen, I’m a big fan of tennis, long walks with music, and thinking about how the smallest ideas — like a line of code or a single image — can scale to something unexpectedly powerful.

I’m here to keep learning, keep building, and hopefully, keep making something that matters.
      </p>

      <hr />

      <h2>Education</h2>
      <p>BSc in Computer Science — New Jersey Institute of Technology</p>

      <hr />

      <h2>Experience</h2>
      <ul className="about-list">
        <li><p><strong>AI Developer</strong> · Trend Recommender | FastAPI • FAISS • CLIP</p></li>
        <li><p><strong>Data Scientist</strong> · Risk Dashboard | Streamlit • Plotly</p></li>
      </ul>

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
);

export default AboutAndContact