import type { ReactNode } from 'react'

import { useSlider } from '../hooks/use-slider'

import { SliderContext } from './slider-context'

/**
 * Пропсы для провайдера слайдера
 */
export interface SliderProviderProps<T> {
    /** Элементы для отображения */
    items: T[]
    /** Зацикливать ли слайдер */
    loop?: boolean
    /** Расстояние между слайдами в пикселях */
    gap?: number
    /** Ширина слайда в пикселях */
    slideWidth?: number
    /** Угол поворота слайдов */
    rotationAngle?: number
    /** Вертикальное смещение для первых соседних слайдов */
    firstOffsetY?: number
    /** Коэффициент прогрессии вертикального смещения для более далеких слайдов */
    progressiveOffsetY?: number
    /** Скрывать ли слайды, которые находятся далеко от активного */
    hideDistantSlides?: boolean
    /** Чувствительность свайпа (меньшее значение = более чувствительный) */
    swipeSensitivity?: number
    /** Дочерние элементы */
    children: ReactNode
}

/**
 * Провайдер контекста слайдера
 */
export const SliderProvider = <T,>({
    items,
    loop,
    gap,
    slideWidth,
    rotationAngle,
    firstOffsetY,
    progressiveOffsetY,
    hideDistantSlides,
    swipeSensitivity,
    children,
}: SliderProviderProps<T>) => {
    const sliderHook = useSlider<T>({
        items,
        loop,
        gap,
        slideWidth,
        rotationAngle,
        firstOffsetY,
        progressiveOffsetY,
        hideDistantSlides,
        swipeSensitivity,
    })

    const {
        getContainerProps,
        extendedItems,
        getSlideProps,
        getProgressBarProps,
        getProgressBarContainerProps,
    } = sliderHook

    return (
        <SliderContext.Provider
            value={{
                extendedItems,
                getContainerProps,
                getSlideProps,
                getProgressBarProps,
                getProgressBarContainerProps,
            }}
        >
            {children}
        </SliderContext.Provider>
    )
}
