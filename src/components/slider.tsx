import type { ReactNode } from 'react'
import type { SliderProviderProps } from './slider-provider'

import { SliderProvider } from './slider-provider'
import { SliderWrapper } from './slider-wrapper'
import { SlideItems } from './slide-items'
import { ProgressBar } from './progress-bar'

/**
 * Пропсы для основного компонента слайдера
 */
export interface SliderProps<T>
    extends Omit<SliderProviderProps<T>, 'children'> {
    /** CSS-класс для контейнера слайдера */
    className?: string
    /** CSS-класс для слайдов */
    slideClassName?: string
    /** CSS-класс для контейнера прогресс-бара */
    progressBarClassName?: string
    /** CSS-класс для заполнения прогресс-бара */
    progressBarFillClassName?: string
    /** Функция для рендеринга содержимого слайда */
    renderItem: (item: T, index: number) => ReactNode
}

/**
 * Основной компонент слайдера
 */
export const Slider = <T,>({
    className,
    slideClassName,
    progressBarClassName,
    progressBarFillClassName,
    renderItem,
    items,
    loop,
    gap,
    slideWidth,
    rotationAngle,
    firstOffsetY,
    progressiveOffsetY,
    hideDistantSlides,
    swipeSensitivity,
}: SliderProps<T>) => {
    return (
        <SliderProvider<T>
            items={items}
            loop={loop}
            gap={gap}
            slideWidth={slideWidth}
            rotationAngle={rotationAngle}
            firstOffsetY={firstOffsetY}
            progressiveOffsetY={progressiveOffsetY}
            hideDistantSlides={hideDistantSlides}
            swipeSensitivity={swipeSensitivity}
        >
            <SliderWrapper className={className}>
                <SlideItems<T>
                    renderItem={renderItem}
                    className={slideClassName}
                />
            </SliderWrapper>
            <ProgressBar
                className={progressBarClassName}
                fillClassName={progressBarFillClassName}
            />
        </SliderProvider>
    )
}
