import React from 'react';
import './index.scss'; 
import SkillsCarousel from '../Skills'
import Loader from 'react-loaders';
import 'loaders.css/loaders.min.css'; 

const projects = [
  {
    title: 'AgentWeave: AI Fashion Trend Recommender',
    description:
      'An intelligent fashion system that recommends outfits using Pinterest scraping, CLIP/BLIP embeddings, FAISS clustering, and user prompts. Includes trend timeline, stock predictor, and body type matching.',
    tech: ['CLIP', 'FAISS', 'Firebase'],
    link: 'https://agentweave.vercel.app/'
  },
  {
    title: 'Skincare AI Recommender',
    description:
      'CNN-based skincare classifier + product recommender powered by FastAPI backend. Accepts webcam or image upload to suggest Prana Beauty products with Grad-CAM.',
    tech: ['PyTorch', 'FastAPI', 'Grad-CAM', 'MongoDB'],
    link: '#'
  },
  {
    title: 'Geopolitical Risk Mapper',
    description:
      'AI-powered dashboard that scrapes global news, calculates regional risk scores, and visualizes heatmap trends using Plotly and Streamlit.',
    tech: ['Python', 'Plotly', 'Pandas', 'Streamlit'],
    link: '#'
  }
];

const Badge = ({ children }) => (
  <span className="badge">{children}</span>
);

const Card = ({ children }) => (
  <div className="card">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);


const Projects = () => {
  return (
    <>
    <div className="container project-page">
          <h2 className="section-title">Skills</h2>
  <div className="skills-container">
    <><SkillsCarousel></SkillsCarousel></>
  </div>
    <h1 className="section-title">Projects</h1>
    <div className="project-grid">
        {projects.map(({ title, description, tech, link }) => (
            <Card key={title}>
                <CardContent>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className="badge-container">
                        {tech.map(tag => <Badge key={tag}>{tag}</Badge>)}
                    </div>
                    <a href={link} target="_blank" rel="noopener noreferrer">Visit →</a>
                </CardContent>
            </Card>
        ))}
          </div>
      </div>
        <Loader type="ball-scale-multiple" active/>
    </>
  );
};

export default Projects;

