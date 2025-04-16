# SliderX

Современный и гибкий React-компонент для создания красивых слайдеров с различными эффектами.

## Установка

```bash
npm install sliderx-react
# или
yarn add sliderx-react
# или
bun add sliderx-react
# или
pnpm add sliderx-react
```

После установки не забудьте импортировать стили:

```jsx
// Импорт стилей (обязательно)
import 'sliderx-react/dist/index.css';

// Импорт компонентов
import { Slider } from 'sliderx-react';
```

## Основные возможности

- 🌀 Эффект карусели с поворотом слайдов
- 📱 Поддержка свайпов
- 🔄 Бесконечная прокрутка
- 📏 Настраиваемые размеры и отступы
- 📊 Прогресс-бар для отображения позиции
- 🎨 Полностью стилизуемые компоненты

## Быстрый старт

```jsx
import 'sliderx-react/dist/index.css';
import { Slider } from 'sliderx-react';

const images = [
  { id: 1, src: '/image1.jpg', alt: 'Image 1' },
  { id: 2, src: '/image2.jpg', alt: 'Image 2' },
  { id: 3, src: '/image3.jpg', alt: 'Image 3' },
  // ...
];

function App() {
  return (
    <Slider 
      items={images}
      renderItem={(item) => (
        <img src={item.src} alt={item.alt} style={{ width: '100%', height: 'auto' }} />
      )}
    />
  );
}
```

## Настройка

SliderX предоставляет множество опций для настройки:

```jsx
<Slider 
  items={images}
  renderItem={(item) => <img src={item.src} alt={item.alt} />}
  
  // Основные настройки
  loop={true}                // Бесконечная прокрутка
  gap={60}                   // Отступ между слайдами (px)
  slideWidth={650}           // Ширина слайда (px)
  
  // Эффекты
  rotationAngle={5}          // Угол поворота слайдов (градусы)
  firstOffsetY={45}          // Вертикальное смещение первых соседних слайдов (px)
  progressiveOffsetY={20}    // Коэффициент для вертикального смещения дальних слайдов
  hideDistantSlides={true}   // Скрывать отдаленные слайды 
  
  // Поведение
  swipeSensitivity={5}       // Чувствительность свайпа (меньше = чувствительнее)
  
  // Классы для стилизации
  className="my-slider"
  slideClassName="my-slide"
  progressBarClassName="my-progressbar"
  progressBarFillClassName="my-progressbar-fill"
/>
```

## Продвинутое использование

### Использование хука useSlider

Для более гибкого управления слайдером вы можете использовать хук `useSlider`:

```jsx
import 'sliderx-react/dist/index.css';
import { useSlider, SliderProvider, SliderWrapper, SlideItems, ProgressBar } from 'sliderx-react';

function MyCustomSlider() {
  const { activeIndex, setActiveIndex, totalItems } = useSlider();
  
  // Создаем собственные функции навигации
  const next = () => {
    setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
  };
  
  const prev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
  };
  
  const goTo = (index) => {
    setActiveIndex(index);
  };
  
  return (
    <div>
      <button onClick={prev}>Назад</button>
      <button onClick={next}>Вперед</button>
      <span>Текущий слайд: {activeIndex + 1}</span>
      
      <div>
        {/* Кнопки быстрого перехода */}
        {Array.from({ length: totalItems }).map((_, index) => (
          <button 
            key={index} 
            onClick={() => goTo(index)}
            style={{ 
              fontWeight: index === activeIndex ? 'bold' : 'normal',
              margin: '0 5px'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <SliderProvider 
      items={images}
      loop={true}
      // другие настройки...
    >
      <SliderWrapper>
        <SlideItems
          renderItem={(item) => <img src={item.src} alt={item.alt} />}
        />
      </SliderWrapper>
      <ProgressBar />
      <MyCustomSlider />
    </SliderProvider>
  );
}
```

## Лицензия

MIT
