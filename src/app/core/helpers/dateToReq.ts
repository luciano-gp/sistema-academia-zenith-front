import moment from "moment";

export default (date: Date, justDate = false) =>
  moment(date).format(`YYYY-MM-DD${justDate ? '' : ' hh:mm:ss'}`);
