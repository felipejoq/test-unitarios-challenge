import { v4 as uuid, validate } from 'uuid';

export const getUUID = () => {
  return uuid();
}

export const isUUID = (uuid) => {
  return validate(uuid);
}