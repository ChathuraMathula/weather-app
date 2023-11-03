export const capitalizeEachWord = (str) => {
    const words = str.split(" ");
    const capitalizedWords = [];
    words.forEach(word => {
        const letters = word.split("");
        letters[0] = letters[0].toUpperCase();
        capitalizedWords.push(letters.join(""));
    });
    return capitalizedWords.join(" ").trim();
};