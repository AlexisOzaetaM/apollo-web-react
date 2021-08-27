const getTwoDigitsNumber = number => {
    return number < 10 ? '0' + number : number
}

export const convertDate = rowDate => {
    let date = new Date(rowDate)
    return [
        date.getFullYear(),
        getTwoDigitsNumber(date.getMonth() + 1),
        getTwoDigitsNumber(date.getDate())
    ].join('-')
}