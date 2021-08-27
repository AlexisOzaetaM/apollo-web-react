export const removeUserFromArray = (arr, value) => {
    return arr.filter((element) => {
        return element.value !== value
    })
};