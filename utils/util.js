const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = 0

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = 0

  return [hour, minute, second].map(formatNumber).join(':')
}

const formatTime1 = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//文本切割
function cutstr(str, len){
  if (len > str.length) {
    return str;
  }else{
    var res = str.subString(0, len);
    return res.concat("...");
  }
}

const stringContains = 

module.exports = {
  formatDateTime: formatDateTime,
  formatDate: formatDate,
  formatTime: formatTime,
  formatNumber: formatNumber,
  formatTime1: formatTime1,
  cutstr: cutstr
}
