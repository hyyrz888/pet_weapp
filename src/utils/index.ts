import dayjs from 'dayjs';

const formatDateTime = (date: string | Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export { formatDateTime };
