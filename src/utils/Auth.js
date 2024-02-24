export const auth = () => {
  if (sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken") != null) {
    return true;
  }
  return false;
};

export const dateFormat = (dateString) => {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(dateString);
  const time = formatAMPM(date);
  return date.getDay() + " " + months[date.getMonth()] + " " + date.getFullYear() + " " + time;
};

export const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
