import 'dotenv/config';
import env from 'env-var'

export const envsPlugin = {
  PORT: env.get('PORT').required().asInt(),
  PATH_DATA: env.get('PATH_DATA').required().asString(),
  DATA_NAME: env.get('DATA_NAME').required().asString(),
}