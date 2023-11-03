export const getRandomHSLColor = (str) => {
    const num = (str.split("").reduce((acc, curr) => {
        return acc + curr.charCodeAt(0);
    }, 0) % 300);

    return `hsl(${num}, 80%, 30%)`;
};