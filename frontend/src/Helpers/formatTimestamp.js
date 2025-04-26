import { format } from 'date-fns';

export const formatTimestamp = (timestamp, dateFormat = 'yyyy-MM-dd HH:mm:ss') => {
  const date = new Date(timestamp);
  return format(date, dateFormat);
};
