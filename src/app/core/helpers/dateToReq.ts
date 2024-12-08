import moment from "moment";

export default (date: Date, justDate = false) =>
  justDate ? moment(date).format(`YYYY-MM-DD`) : moment(date).format(`YYYY-MM-DD hh:mm:ss`);
