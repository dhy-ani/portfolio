
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
    mode: "free",
    slides: {
      perView: 3,
      spacing: 7,
    },
    centered: true
  });

  return (
    <div className="skills-section">
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