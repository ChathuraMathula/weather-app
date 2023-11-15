export const getColor = (index) => {
    const colors = ["#378de7", "#6149cb", "#40b681", "#de934e", "#9c3939"];

    return colors[index % colors.length];
}