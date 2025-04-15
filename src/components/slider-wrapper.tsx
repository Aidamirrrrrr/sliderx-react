import type { ReactNode } from 'react'

import cn from 'classnames'

import cls from './styles/slider.module.css'
import { useSliderContext } from './slider-context'

/**
 * Свойства контейнера слайдера
 */
export type ContainerProps = {
    ref: React.RefObject<HTMLDivElement | null>
    style: {
        height: string
        cursor: 'grab' | 'grabbing'
    }
    onMouseDown: (e: React.MouseEvent) => void
    onMouseMove: (e: React.MouseEvent) => void
    onMouseUp: () => void
    onMouseLeave: () => void
    onTouchStart: (e: React.TouchEvent) => void
    onTouchMove: (e: React.TouchEvent) => void
    onTouchEnd: () => void
}

/**
 * Пропсы для компонента-обертки слайдера
 */
export interface SliderWrapperProps {
    /** CSS-класс */
    className?: string
    /** Дочерние элементы */
    children: ReactNode
}

/**
 * Компонент-обертка для контейнера слайдов
 */
export const SliderWrapper = ({ className, children }: SliderWrapperProps) => {
    const { getContainerProps } = useSliderContext()

    return (
        <div className={cn(className, cls.slider)} {...getContainerProps()}>
            {children}
        </div>
    )
}
