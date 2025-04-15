import type { ReactNode } from 'react'

import { useSliderContext } from './slider-context'
import { Slide } from './slide'

interface SlideItemsProps<T> {
    renderItem: (item: T, index: number) => ReactNode
    className?: string
}

/**
 * Компонент, генерирующий слайды автоматически на основе переданного рендер-пропса
 */
export const SlideItems = <T,>({
    renderItem,
    className,
}: SlideItemsProps<T>) => {
    const { extendedItems } = useSliderContext<T>()

    return (
        <>
            {extendedItems.map((item, index) => (
                <Slide key={index} index={index} className={className}>
                    {renderItem(item, index)}
                </Slide>
            ))}
        </>
    )
}
