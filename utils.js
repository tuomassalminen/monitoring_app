
export const getToday = () => {
    return new Date().toISOString().slice(0, 10)
}