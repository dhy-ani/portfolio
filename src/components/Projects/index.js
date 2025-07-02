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
          'CNN-based skincare classifier and personalized product recommender powered by PyTorch and FastAPI. Uses Grad-CAM for explainability and allows webcam or image input to suggest Prana Beauty products.',
        tech: ['PyTorch', 'FastAPI', 'Grad-CAM', 'Firebase'],
        link: 'https://github.com/dhy-ani/prana'
      },
      {
        title: 'Skin Lesion Detection',
        description:
          'A medical AI tool built with TensorFlow and OpenCV to classify dermatological conditions from image input. Deployed with Streamlit for quick diagnostic testing.',
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
          'A full-stack note-sharing web app for academic communities. Built with Spring Boot and React, it features file upload, JWT-authenticated access, and secure PostgreSQL + AWS S3 integration.',
        tech: ['Spring Boot', 'PostgreSQL', 'AWS S3', 'JWT', 'React'],
        link: 'https://github.com/dhy-ani/note-sharing-platform'
      },
      {
        title: 'Tea and Coffee Accessories',
        description:
          'An e-commerce platform developed using PHP and MySQL. Supports CRUD operations for products, AJAX-based live inventory display, and input sanitization against SQL injection.',
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
          'A Streamlit-based dashboard that visualizes real-time regional conflict risk by scraping global news and calculating scores. Built using Plotly for interactive maps.',
        tech: ['Python', 'Plotly', 'Pandas', 'Streamlit'],
        link: 'https://github.com/dhy-ani/newsmapping'
      },
      {
        title: 'RAISE-25 AI & Data Science Competition',
        description:
          'Built NLP pipelines using BERT, sentiment analysis, and t-SNE to identify public concerns in large datasets and present insights using Tableau.',
        tech: ['Python', 'BERT', 'NLP', 't-SNE', 'Tableau'],
        link: '#'
      },
      {
        title: 'Global Housing Market Analysis',
        description:
          'Collaborative data science project analyzing international housing trends using regression and clustering. Visualized insights using Seaborn and Matplotlib, and published full code on GitHub.',
        tech: ['Python', 'Pandas', 'Seaborn', 'Scikit-learn', 'Matplotlib'],
        link: 'https://github.com/nandika-k/Data-Science-Project-2'
      }
    ]
  }
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
          <div key={category}>
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
