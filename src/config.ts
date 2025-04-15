/**
 * Тип конфигурации слайдера
 */
export interface SliderConfig {
    /** Включить бесконечный циклический режим */
    loop: boolean
    /** Расстояние между слайдами в пикселях */
    gap: number
    /** Ширина слайда в пикселях */
    slideWidth: number
    /** Угол поворота слайдов (в градусах) */
    rotationAngle: number
    /** Вертикальное смещение для первых соседних слайдов */
    firstOffsetY: number
    /** Коэффициент прогрессии вертикального смещения */
    progressiveOffsetY: number
    /** Скрывать далекие слайды */
    hideDistantSlides: boolean
    /** Чувствительность свайпа (меньше = чувствительнее) */
    swipeSensitivity: number
}

/**
 * Стандартные значения для конфигурации слайдера
 */
export const DEFAULT_SLIDER_CONFIG: SliderConfig = {
    loop: true,
    gap: 60,
    slideWidth: 650,
    rotationAngle: 5,
    firstOffsetY: 45,
    progressiveOffsetY: 20,
    hideDistantSlides: true,
    swipeSensitivity: 5,
}
