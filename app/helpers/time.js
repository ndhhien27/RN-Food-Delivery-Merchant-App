import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
const now = new Date();

export const diffTime = time => {
  const diff = moment.range(time, now);
  const days = diff.diff('days');
  const hours = diff.diff('hours');
  const minutes = diff.diff('minutes');
  const seconds = diff.diff('seconds');
  if (days >= 1) return `${days} days ago`;
  if (hours >= 1) return `${hours} hours ago`;
  if (minutes >= 1) return `${minutes} minutes ago`;
  return `${seconds} seconds ago`;
};

export default date => {
  let aestTime = new Date(date).toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
  aestTime = new Date(aestTime);
  // return aestTime.toLocaleString();
  return moment(aestTime).format('lll');
};
