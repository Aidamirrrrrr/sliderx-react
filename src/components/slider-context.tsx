import type { ContainerProps } from './slider-wrapper'
import type { GetSlidePropsFunction } from './slide'
import type {
    ProgressBarStyleProps,
    ProgressBarContainerProps,
} from './progress-bar'

import { createContext, useContext } from 'react'

/**
 * Тип контекста слайдера
 */
export interface SliderContextType<T> {
    extendedItems: T[]
    getContainerProps: () => ContainerProps
    getSlideProps: GetSlidePropsFunction
    getProgressBarProps: () => ProgressBarStyleProps
    getProgressBarContainerProps: () => ProgressBarContainerProps
}

/**
 * Контекст слайдера для передачи данных через дерево компонентов
 */
export const SliderContext = createContext<SliderContextType<unknown> | null>(
    null
)

/**
 * Хук для использования контекста слайдера внутри компонентов
 */
export const useSliderContext = <T,>() => {
    const context = useContext(SliderContext) as SliderContextType<T> | null
    if (!context) {
        throw new Error(
            'useSliderContext должен использоваться внутри SliderProvider'
        )
    }
    return context
}
