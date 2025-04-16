import type { CSSProperties, ReactNode } from 'react'

import cn from 'classnames'

import { useSliderContext } from './slider-context'

/**
 * Тип для функции получения свойств слайда
 */
export type GetSlidePropsFunction = (index: number) => {
    onClick: () => void
    ref: (el: HTMLDivElement | null) => void
    style: SlideStyleProps
}

/**
 * Стили для слайда
 */
export type SlideStyleProps = {
    maxWidth: string
    transform: string
    zIndex: number
    transition: string
    visibility: CSSProperties['visibility']
}

/**
 * Пропсы для компонента слайда
 */
export interface SlideProps {
    /** Индекс слайда */
    index: number
    /** CSS-класс */
    className?: string
    /** Дочерние элементы */
    children: ReactNode
}

/**
 * Компонент слайда
 */
export const Slide = ({ index, className, children }: SlideProps) => {
    const { getSlideProps } = useSliderContext()

    return (
        <div className={cn(className, 'sliderx-slide')} {...getSlideProps(index)}>
            {children}
        </div>
    )
}
