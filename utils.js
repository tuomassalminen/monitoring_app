
export const getToday = () => {
    return new Date().toISOString().slice(0, 10)
}

export const getDateAsString = (date) => {
    return date.toISOString().slice(0, 10)
}

export const getDateFromWeek = (weekDate) => {
    const week = weekDate.slice(6, 7)
    const year = weekDate.slice(0, 3)
}

// Default week is the last week
export const getDefaultWeek = () => {
    let date = new Date()
    date.setHours(0,0,0,0)
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4)
    const weekNumber = Math.round(
        ((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7
    )
    const dateAsString = getDateAsString(date)
    const year = dateAsString.slice(0, 4)
    
    return `${year}-W${weekNumber}`
}

// Default month is last month
export const getDefaultMonth = () => {
    let date = new Date()
    date.setDate(date.getDate() - 30)
    const dateAsString = getDateAsString(date)
    const month = dateAsString.slice(5, 7)
    const year = dateAsString.slice(0, 4)
    return `${year}-${month}`
}

export const getDatesFromMonth = (month) => {
    let startDate = new Date(month)
    let endDate = new Date(month)
    endDate.setDate(endDate.getDate() + 30)
    return {
        startDate: getDateAsString(startDate),
        endDate: getDateAsString(endDate),
    }
}

export const getDatesFromWeek = (week) => {
    const weekNumber = week.slice(6, 8)
    const year = week.slice(0, 4)
    const startDay = (weekNumber - 1) * 7
    
    const startDate = new Date(year, 0, startDay)
    let endDate = new Date(year, 0, startDay)
    endDate.setDate(endDate.getDate() + 6)
    return {
        startDate: getDateAsString(startDate),
        endDate: getDateAsString(endDate),
    }
}
