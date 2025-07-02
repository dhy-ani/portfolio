import React from 'react';
import './index.scss'; 
import SkillsCarousel from '../Skills';
import Loader from 'react-loaders';
import 'loaders.css/loaders.min.css'; 

const projectSections = [
  {
    category: 'AI/ML Projects',
    projects: [
      {
        title: 'AgentWeave: AI Fashion Trend Recommender',
        description:
          'An intelligent fashion system that recommends outfits using Pinterest scraping, CLIP/BLIP embeddings, FAISS clustering, and user prompts. Includes trend timeline, stock predictor, and YOLO-based body type matching.',
        tech: ['CLIP', 'FAISS', 'YOLO', 'Firebase', 'React'],
        link: 'https://github.com/dhy-ani/agentweave'
      },
      {
        title: 'Skincare AI Recommender',
        description:
          'CNN-based skincare classifier and product recommender powered by FastAPI. Accepts webcam or image uploads, applies Grad-CAM visualization, and suggests Prana Beauty products.',
        tech: ['PyTorch', 'FastAPI', 'Grad-CAM', 'Firebase'],
        link: 'https://github.com/dhy-ani/prana'
      },
      {
        title: 'Skin Lesion Detection',
        description:
          'TensorFlow-based CNN app deployed with Streamlit to classify skin lesion images and simulate dermatology screening.',
        tech: ['TensorFlow', 'OpenCV', 'Streamlit'],
        link: 'https://github.com/dhy-ani/lesion-cnn-classification-model'
      }
    ]
  },
  {
    category: 'Full-Stack & Backend Projects',
    projects: [
      {
        title: 'NoteShare Platform',
        description:
          'Full-stack academic note-sharing platform built with Spring Boot, PostgreSQL, AWS S3, and React. Implements JWT authentication and secure document management.',
        tech: ['Spring Boot', 'PostgreSQL', 'AWS S3', 'JWT', 'React'],
        link: 'https://github.com/dhy-ani/note-sharing-platform'
      },
      {
        title: 'Tea and Coffee Accessories',
        description:
          'E-commerce web application featuring full CRUD functionality for product management, real-time stock updates via AJAX, and secure PHP/MySQL backend with SQL injection protection.',
        tech: ['MySQL', 'PHP', 'AJAX', 'JavaScript', 'HTML/CSS'],
        link: 'https://github.com/dhy-ani/ds2338-IT202-Project'
      }
    ]
  },
  {
    category: 'Data Visualization & Research Tools',
    projects: [
      {
        title: 'Geopolitical Risk Mapper',
        description:
          'AI-powered dashboard that scrapes global news, computes region-wise conflict scores, and displays temporal heatmap trends using Plotly.',
        tech: ['Python', 'Plotly', 'Pandas', 'Streamlit'],
        link: 'https://github.com/dhy-ani/newsmapping'
      },
      {
        title: 'RAISE-25 AI & Data Science Competition',
        description:
          'Used BERT, sentiment analysis, and t-SNE to extract insights from large-scale text data and visualize societal trends.',
        tech: ['Python', 'BERT', 'NLP', 't-SNE', 'Tableau'],
        link: '#'
      },
            {
        title: 'Global Housing Market Analysis',
        description:
          'Exploratory data analysis and machine learning project that investigates global housing trends, applies regression models, and visualizes patterns using Matplotlib and Seaborn. Includes detailed preprocessing, model evaluation, and GitHub-hosted code.',
        tech: ['Python', 'Pandas', 'Seaborn', 'Scikit-learn', 'Matplotlib'],
        link: 'https://github.com/nandika-k/Data-Science-Project-2'
      }
    ]
  },
  
];

const Badge = ({ children }) => <span className="badge">{children}</span>;
const Card = ({ children }) => <div className="card">{children}</div>;
const CardContent = ({ children }) => <div className="card-content">{children}</div>;

const Projects = () => {
  return (
    <>
      <div className="container project-page">
        <h2 className="section-title">Skills</h2>
        <div className="skills-container">
          <SkillsCarousel />
        </div>

        <h1 className="section-title">Projects</h1>
        {projectSections.map(({ category, projects }) => (
          <div key={category} className="project-section">
            <h2 className="project-category">{category}</h2>
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
        ))}
      </div>
      <Loader type="ball-scale-multiple" active />
    </>
  );
};

export default Projects;
