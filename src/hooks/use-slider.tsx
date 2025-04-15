import type { CSSProperties } from 'react'

import { useState, useEffect, useRef, useMemo } from 'react'

import { DEFAULT_SLIDER_CONFIG } from '../config'
import { type SlideStyleProps } from '../components/slide'
import { type ContainerProps } from '../components/slider-wrapper'
import { type ProgressBarStyleProps } from '../components/progress-bar'
import { type ProgressBarContainerProps } from '../components/progress-bar'

/**
 * Конфигурация слайдера
 */
export interface UseSliderProps<T> {
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
}

/**
 * Основной хук для управления слайдером
 */
export const useSlider = <T,>({
    items,
    loop = DEFAULT_SLIDER_CONFIG.loop,
    gap = DEFAULT_SLIDER_CONFIG.gap,
    slideWidth = DEFAULT_SLIDER_CONFIG.slideWidth,
    rotationAngle = DEFAULT_SLIDER_CONFIG.rotationAngle,
    firstOffsetY = DEFAULT_SLIDER_CONFIG.firstOffsetY,
    progressiveOffsetY = DEFAULT_SLIDER_CONFIG.progressiveOffsetY,
    hideDistantSlides = DEFAULT_SLIDER_CONFIG.hideDistantSlides,
    swipeSensitivity = DEFAULT_SLIDER_CONFIG.swipeSensitivity,
}: UseSliderProps<T>) => {
    /* Рефы для получения размеров и управления DOM-элементами */
    const itemsRef = useRef<Array<HTMLDivElement | null>>([])
    const containerRef = useRef<HTMLDivElement>(null)

    /* Состояние слайдера */
    const [activeIndex, setActiveIndex] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [currentX, setCurrentX] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)

    /* Удваиваем массив элементов при зацикливании */
    const extendedItems = useMemo(() => {
        return loop ? [...items, ...items] : items
    }, [items, loop])

    const totalItems = extendedItems.length

    /* Вычисляем высоту контейнера на основе высоты самого высокого слайда */
    useEffect(() => {
        const calculateMaxHeight = () => {
            const heights = itemsRef.current
                .filter((ref) => ref !== null)
                .map((ref) => ref?.getBoundingClientRect().height || 0)

            const maxHeight = Math.max(...heights)
            if (maxHeight > 0) {
                setContainerHeight(maxHeight)
            }
        }

        calculateMaxHeight()
        window.addEventListener('resize', calculateMaxHeight)
        return () => window.removeEventListener('resize', calculateMaxHeight)
    }, [])

    /**
     * Обработчик клика по слайду
     */
    const handleSlideClick = (index: number) => {
        if (Math.abs(dragOffset) > swipeSensitivity) return
        setActiveIndex(index)
    }

    /**
     * Обработчик начала перетаскивания
     */
    const handleDragStart = (clientX: number) => {
        setIsDragging(true)
        setStartX(clientX)
        setCurrentX(clientX)
        setDragOffset(0)
    }

    /**
     * Обработчик перемещения при перетаскивании
     */
    const handleDragMove = (clientX: number) => {
        if (!isDragging) return
        setCurrentX(clientX)

        const offset = (clientX - startX) / 3
        setDragOffset(offset)
    }

    /**
     * Обработчик завершения перетаскивания
     */
    const handleDragEnd = () => {
        if (!isDragging) return

        const diffX = currentX - startX
        if (Math.abs(diffX) > swipeSensitivity) {
            if (diffX > 0) {
                /* Свайп вправо - предыдущий слайд */
                setActiveIndex((prev) => {
                    const newIndex = prev - 1
                    // Если loop включен, при достижении начала списка переходим в конец
                    // Если loop выключен, остаемся на первом слайде
                    if (newIndex < 0) {
                        return loop ? totalItems - 1 : 0
                    }
                    return newIndex
                })
            } else if (diffX < 0) {
                /* Свайп влево - следующий слайд */
                setActiveIndex((prev) => {
                    const newIndex = prev + 1
                    // Если loop включен, при достижении конца списка переходим в начало
                    // Если loop выключен, остаемся на последнем слайде
                    if (newIndex >= totalItems) {
                        return loop ? 0 : totalItems - 1
                    }
                    return newIndex
                })
            }
        }

        setIsDragging(false)
        setDragOffset(0)
    }

    /**
     * Вычисляет смещение слайда относительно активного с учетом зацикливания
     */
    const calculateOffset = (index: number) => {
        const directOffset = index - activeIndex

        /* Оптимизируем путь при зацикливании, но только если loop включен */
        if (loop) {
            if (directOffset > totalItems / 2) {
                return directOffset - totalItems
            } else if (directOffset < -totalItems / 2) {
                return directOffset + totalItems
            }
        }

        return directOffset
    }

    /**
     * Получить стили для слайда
     */
    const getSlideStyle = (index: number): SlideStyleProps => {
        const offset = calculateOffset(index)

        /* Горизонтальное смещение с учетом перетаскивания */
        const translateX =
            offset * (slideWidth + gap) + (isDragging ? dragOffset : 0)

        /* Угол поворота с учетом перетаскивания */
        const rotation =
            offset * rotationAngle + (isDragging ? dragOffset * 0.01 : 0)

        /* Вертикальное смещение с нелинейной прогрессией и учетом направления перетаскивания */
        let translateY = 0

        if (isDragging && dragOffset !== 0) {
            // Определяем направление перетаскивания (dragOffset > 0 - вправо, < 0 - влево)
            const isDraggingRight = dragOffset > 0

            // Коэффициент воздействия на Y в зависимости от перетаскивания
            const dragInfluenceY = Math.abs(dragOffset) * 0.2

            if (isDraggingRight) {
                // При перетаскивании вправо: правые карточки и центр опускаются, левые поднимаются
                if (offset >= 0) {
                    // центр и правые карточки
                    translateY = Math.max(0, offset) * dragInfluenceY
                } else {
                    // левые карточки
                    translateY =
                        -dragInfluenceY * (1 - Math.min(1, -offset * 0.3))
                }
            } else {
                // При перетаскивании влево: левые карточки и центр опускаются, правые поднимаются
                if (offset <= 0) {
                    // центр и левые карточки
                    translateY = Math.max(0, -offset) * dragInfluenceY
                } else {
                    /* правые карточки */
                    translateY =
                        -dragInfluenceY * (1 - Math.min(1, offset * 0.3))
                }
            }
        }

        /* Применяем статическое смещение по Y (базовую перспективу) */
        if (Math.abs(offset) === 1) {
            translateY += firstOffsetY
        } else if (Math.abs(offset) > 1) {
            translateY +=
                firstOffsetY +
                Math.pow(Math.abs(offset), 2) * progressiveOffsetY
        }

        /* Порядок наложения слайдов */
        const zIndex = totalItems - Math.abs(offset)

        /* Видимость слайдов */
        const visibility =
            hideDistantSlides && Math.abs(offset) >= 2 ? 'hidden' : 'visible'

        return {
            maxWidth: `${slideWidth}px`,
            transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
            zIndex,
            transition: isDragging ? 'none' : 'all 0.3s ease',
            visibility: visibility as CSSProperties['visibility'],
        }
    }

    /**
     * Получить пропсы для контейнера слайдера
     */
    const getContainerProps = (): ContainerProps => ({
        ref: containerRef,
        style: {
            height: containerHeight ? `${containerHeight}px` : 'auto',
            cursor: isDragging ? 'grabbing' : 'grab',
        },
        onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX),
        onMouseMove: (e: React.MouseEvent) => handleDragMove(e.clientX),
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
        onTouchStart: (e: React.TouchEvent) => {
            if (e.touches[0]) handleDragStart(e.touches[0].clientX)
        },
        onTouchMove: (e: React.TouchEvent) => {
            if (e.touches[0]) handleDragMove(e.touches[0].clientX)
        },
        onTouchEnd: handleDragEnd,
    })

    /**
     * Получить пропсы для слайда
     */
    const getSlideProps = (index: number) => ({
        onClick: () => handleSlideClick(index),
        ref: (el: HTMLDivElement | null) => {
            itemsRef.current[index] = el
        },
        style: getSlideStyle(index),
    })

    /**
     * Получить пропсы для заполнения прогресс-бара
     */
    const getProgressBarProps = (): ProgressBarStyleProps => ({
        style: {
            width: `${(activeIndex / (totalItems - 1)) * 100}%`,
            transition: 'width 0.3s ease',
        },
    })

    /**
     * Получить пропсы для контейнера прогресс-бара
     */
    const getProgressBarContainerProps = (): ProgressBarContainerProps => ({
        onClick: (e: React.MouseEvent) => {
            const bar = e.currentTarget
            const rect = bar.getBoundingClientRect()
            const position = (e.clientX - rect.left) / rect.width
            const newIndex = Math.min(
                Math.floor(position * totalItems),
                totalItems - 1
            )
            setActiveIndex(newIndex)
        },
    })

    return {
        activeIndex,
        setActiveIndex,
        extendedItems,
        totalItems,
        getContainerProps,
        getSlideProps,
        getProgressBarProps,
        getProgressBarContainerProps,
        handleSlideClick,
    }
}
