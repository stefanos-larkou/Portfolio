export function flight(from: DOMRect, to: DOMRect, ratio: number): string {
    return `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${ratio})`;
}
