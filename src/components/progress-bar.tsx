import cn from 'classnames'

import { useSliderContext } from './slider-context'

/**
 * Тип для функции получения свойств прогресс-бара
 */
export type ProgressBarStyleProps = {
    style: {
        width: string
        transition: string
    }
}

/**
 * Тип для функции получения свойств контейнера прогресс-бара
 */
export type ProgressBarContainerProps = {
    onClick: (e: React.MouseEvent) => void
}

/**
 * Пропсы для компонента прогресс-бара
 */
export interface ProgressBarProps {
    /** CSS-класс для контейнера */
    className?: string
    /** CSS-класс для заполнения */
    fillClassName?: string
}

/**
 * Компонент прогресс-бара
 */
export const ProgressBar = ({ className, fillClassName }: ProgressBarProps) => {
    const { getProgressBarContainerProps, getProgressBarProps } =
        useSliderContext()

    return (
        <div
            className={cn(className, 'sliderx-progress-bar')}
            {...getProgressBarContainerProps()}
        >
            <div
                className={cn(fillClassName, 'sliderx-progress-bar-fill')}
                {...getProgressBarProps()}
            ></div>
        </div>
    )
}
