export { Slider } from './components/slider'
export { SliderProvider } from './components/slider-provider'
export { SliderWrapper } from './components/slider-wrapper'
export { Slide } from './components/slide'
export { SlideItems } from './components/slide-items'
export { ProgressBar } from './components/progress-bar'

export { useSlider } from './hooks/use-slider'
export { useSliderContext } from './components/slider-context'

export { DEFAULT_SLIDER_CONFIG } from './config'

export type { SliderContextType } from './components/slider-context'
export type { SliderConfig } from './config'

import styles from './styles.css'

const injectStyles = () => {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    styleElement.setAttribute('data-sliderx', 'true')
    
    if (!document.querySelector('style[data-sliderx="true"]')) {
      document.head.appendChild(styleElement)
    }
  }
}

injectStyles()
