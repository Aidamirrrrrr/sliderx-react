declare module '*.module.css' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.css' {
    const css: string
    export default css
}

declare module '*.css' {
    const content: any
    export default content
}
