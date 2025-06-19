
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import './index.scss';

const skillCategories = [
  'Machine Learning & Data Science',
  'Frontend Development',
  'Backend APIs & Databases',
  'Cloud & DevOps',
  'Creative AI Projects'
];

const SkillsCarousel = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 3,
      spacing: 15,
    },
    centered: true
  });

  return (
    <div className="skills-section">
      <h2 className="section-title">Skills</h2>
      <div ref={sliderRef} className="keen-slider">
        {skillCategories.map((skill, idx) => (
          <div key={idx} className="keen-slider__slide skill-card">
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCarousel;