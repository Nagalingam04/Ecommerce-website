import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getDate(date) {
  return Number(dayjs(date).format('D'));
} 

export function getDeliveryDate(date) {
  return dayjs(date).format('dddd, MMMM D');
}

export function getMonthAndDate(date) {
  return dayjs(date).format('MMMM D');
} 