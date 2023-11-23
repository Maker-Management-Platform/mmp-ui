export function stringToNumber(s: string, n: number): number {
    const d = s.split('')
        .map((v) => v.charCodeAt(0))
        .reduce((a, b) => {
            return a + b
        })
    return (d % n);
}