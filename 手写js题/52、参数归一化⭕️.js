// 参数归一化处理
function formatDatetype(dateType) {

  if (typeof dateType === 'function') return dateType
  
  if (typeof dateType !== 'string') {
    throw new TypeError('dateType is required string or function')
  }

  if (dateType === 'date') {
    dateType = 'YYYY-MM-DD'
  }

  if (dateType === 'datetime') {
    dateType = 'YYYY-MM-DD hh:mm:ss'
  }

  // 和示例中功能最强大的场景保持一致
  return (dataInfo) => {
    const {year, month, day, hour, minite, seconds} = dataInfo
    const newDate = dateType
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('hh', hour)
      .replace('mm', minite)
      .replace('ss', seconds)
    return newDate
  }
}

/**
 * @param date    日期
 * @param dateType 返回的日期格式
 * @param isPad 是否不足两位补零
 */
function getDate(date, dateType, isPad = false) {
  // 将dateType进行归一化，一般是归一化成所有场景中最灵活的场景，在这个例子中就是归一化成一个函数
  const dateFormat = formatDatetype(dateType)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minite = date.getMinutes()
  const seconds = date.getSeconds()

  const padZero = (str) => {
    return isPad ? str.toString().padStart(2, '0') : str
  }

  const dateInfo = {
    year: padZero(year), 
    month: padZero(month), 
    day: padZero(day), 
    hour: padZero(hour), 
    minite: padZero(minite), 
    seconds: padZero(seconds)
  }

  console.log(dateFormat(dateInfo))
  return dateFormat(dateInfo)
}


// getDate(new Date('2023-2-9'), 'date') // 2023-2-9
// getDate(new Date('2023-2-9'), 'date', true) // 2023-02-09

// getDate(new Date('2023-2-9'), 'datetime') // 2023-2-9 12:3:2
// getDate(new Date('2023-2-9'), 'datetime', true) // 2023-02-09 12:03:02

// getDate(new Date('2023-2-9'), 'YYYY年MM月DD日 hh时mm分ss秒') // 2023年2月9日 12时3分2秒
// getDate(new Date('2023-2-9'), 'YYYY年MM月DD日 hh时mm分ss秒', true) // 2023年02月09日 12时03分02秒

// getDate(new Date('2022/12/2'), (dateInfo) => {
//   const {year, month, day, hour, minite, seconds} = dateInfo
//   return `${year}/${month}/${day}--->${hour}\\${minite}\\${seconds}`
// }) // 2023/12/2--->12\3\2


const getDate1 = (date, dateFormat, padZero) => {
  const map = {
    'date': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD hh:mm:ss'
  }

  const isPadZero = (str) => {
    return padZero ? str.toString().padStart(2, '0') : str
  }

  let _dateFormat
  if (typeof dateFormat === 'function') {
    _dateFormat = dateFormat
  } else {
    _dateFormat = (dateInfo) => {
      const format = map[dateFormat] ?? dateFormat

      const {year, month, day, hour, minite, seconds} = dateInfo

      return format
                .replace('YYYY', isPadZero(year))
                .replace('MM', isPadZero(month))
                .replace('DD', isPadZero(day))
                .replace('hh', isPadZero(hour))
                .replace('mm', isPadZero(minite))
                .replace('ss', isPadZero(seconds))
    }
  }

  const dateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(), 
    minite: date.getMinutes(), 
    seconds: date.getSeconds()
  }

  const a = _dateFormat(dateInfo)
  console.log(a)
  return a
}



getDate1(new Date('2023-2-9'), 'date') // 2023-2-9
getDate1(new Date('2023-2-9'), 'date', true) // 2023-02-09

getDate1(new Date('2023-2-9'), 'datetime') // 2023-2-9 12:3:2
getDate1(new Date('2023-2-9'), 'datetime', true) // 2023-02-09 12:03:02

getDate1(new Date('2023-2-9'), 'YYYY年MM月DD日 hh时mm分ss秒') // 2023年2月9日 12时3分2秒
getDate1(new Date('2023-2-9'), 'YYYY年MM月DD日 hh时mm分ss秒', true) // 2023年02月09日 12时03分02秒

getDate1(new Date('2022/12/2'), (dateInfo) => {
  const {year, month, day, hour, minite, seconds} = dateInfo
  return `${year}/${month}/${day}--->${hour}\\${minite}\\${seconds}`
}) // 2023/12/2--->12\3\2

