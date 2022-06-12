import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime).locale('zh-cn');

export const convertDate = (date) => {
  return dayjs(date).fromNow();
};
