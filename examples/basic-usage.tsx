import React from 'react';
import { Slider } from '../src';
import './styles.css';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

const images: ImageItem[] = [
  { id: 1, src: 'https://picsum.photos/id/1/800/500', alt: 'Природа 1' },
  { id: 2, src: 'https://picsum.photos/id/10/800/500', alt: 'Природа 2' },
  { id: 3, src: 'https://picsum.photos/id/20/800/500', alt: 'Природа 3' },
  { id: 4, src: 'https://picsum.photos/id/30/800/500', alt: 'Природа 4' },
  { id: 5, src: 'https://picsum.photos/id/40/800/500', alt: 'Природа 5' },
];

const BasicExample: React.FC = () => {
  return (
    <div className="slider-container">
      <h1>Пример использования SliderX</h1>
      
      <Slider<ImageItem>
        items={images}
        renderItem={(item) => (
          <div className="slide-content">
            <img src={item.src} alt={item.alt} />
            <div className="caption">{item.alt}</div>
          </div>
        )}
        slideWidth={600}
        gap={40}
        rotationAngle={5}
        className="my-slider"
        slideClassName="my-slide"
        progressBarClassName="my-progress"
        progressBarFillClassName="my-progress-fill"
      />
      
      <div className="description">
        <h2>О библиотеке SliderX</h2>
        <p>
          SliderX - это современный и гибкий React-компонент для создания слайдеров
          с поддержкой различных эффектов, включая 3D-карусель, поворот слайдов и плавные анимации.
        </p>
      </div>
    </div>
  );
};

export default BasicExample; 