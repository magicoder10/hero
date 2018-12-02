export function bootstrap(globalStyle: any, Component: any) {
    const globalStyleEl = document.createElement('style');
    globalStyleEl.innerHTML = globalStyle;
    document.head.appendChild(globalStyleEl);

    new Component();
}
