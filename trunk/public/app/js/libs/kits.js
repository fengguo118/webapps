/**
 * 从秒获取 yyyy-mm-dd hh:mm:ss 格式的日期
 * @param second
 * @returns {string}
 */
function getDateYMDHMSFromSecond(second) {
  var date = new Date(Number(second));
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = (date.getYear()+1900) + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
  return currentdate;
}

/**
 * 从秒获取 yyyy-mm-dd 格式的日期
 * @param second
 * @returns {string}
 */
function getDateYMDFromSecond(second) {
  var date = new Date(Number(second));
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = (date.getYear()+1900) + seperator1 + month + seperator1 + strDate;
  return currentdate;
}