function getFormatFun(date, format, ispadZero) {
  if (!["date", "datetime", "YYYY年MM月DD日 hh时mm分ss秒"].includes(format)) {
    return Error("请输入正确的format");
  }

  const formatMap = {
    date: ({ year, month, day }) => {
      return `${year}-${month}-${day}`;
    },
    datetime: ({ year, month, day, hour, minite, seconds }) => {
      return `${year}-${month}-${day} ${hour}:${minite}:${seconds}`;
    },
  };

  const otherFormat = (dateInfo) => {
    const { year, month, day, hour, minite, seconds } = dateInfo;
    return format
      .replace("YYYY", year)
      .replace("MM", month)
      .replace("DD", day)
      .replace("hh", hour)
      .replace("mm", minite)
      .replace("ss", seconds);
  };

  const resFormat = formatMap[format] ? formatMap[format] : otherFormat;

  return resFormat;
}
function getDate(date, format = "date", ispadZero = false) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  if (typeof format !== "function") {
    format = getFormatFun(date, format, ispadZero);
  }

  const padZero = (str) => {
    if (typeof str !== "string") {
      str = str + "";
    }
    return ispadZero ? str.padStart(2, 0) : str;
  };

  const year = padZero(date.getFullYear());
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minite = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  console.log(
    format({
      year,
      month,
      day,
      hour,
      minite,
      seconds,
    })
  );
  return format({
    year,
    month,
    day,
    hour,
    minite,
    seconds,
  });
}

getDate(new Date("2023-2-9"), "date"); // 2023-2-9
getDate(new Date("2023-2-9"), "date", true); // 2023-02-09

getDate(new Date("2023-2-9"), "datetime"); // 2023-2-9 12:3:2
getDate(new Date("2023-2-9"), "datetime", true); // 2023-02-09 12:03:02

getDate(new Date("2023-2-9"), "YYYY年MM月DD日 hh时mm分ss秒"); // 2023年2月9日 12时3分2秒
getDate(new Date("2023-2-9"), "YYYY年MM月DD日 hh时mm分ss秒", true); // 2023年02月09日 12时03分02秒

getDate(new Date("2022/12/2"), (dateInfo) => {
  const { year, month, day, hour, minite, seconds } = dateInfo;
  return `${year}/${month}/${day}--->${hour}\\${minite}\\${seconds}`;
}); // 2023/12/2--->12\3\2
