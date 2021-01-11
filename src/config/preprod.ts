import 'reflect-metadata';
import { deferConfig } from 'config/defer';
import { EncryptionService } from '../components/application/encryption.service';
import { IServiceConfig } from '../commons/interfaces/config/IServiceConfig';

const config: Pick<IServiceConfig, 'mongoose' | 'notifications' | 'redis'> = {
  mongoose: {
    DB: 'masspay-v2-test',
    DB_URI: 'send-preprod-cluster.1oyey.mongodb.net',
    DB_USERNAME: 'app-masspay-v2-test',
    DB_PASSWORD_ENCRYPTED: 'Ily1fVwl1z/oxY/723aa+UVPqbO18ev/i0SGpoTS5H8FFQa42ftVT+zd7I3vEkdy1OC0ezDo/BP9ZQ2L4SSYYypOs3HTQY0iAXOD+LgiFXQr75fn5VshIZWFRpMPS/pNmquUHBwyDkj4jEEhKgha1g==',
    REPLICA_SET: undefined,
    DB_CONNECTION_STRING: deferConfig(() => {
      return `mongodb+srv://${config.mongoose.DB_USERNAME}:${EncryptionService.decrypt(config.mongoose.DB_PASSWORD_ENCRYPTED)}@${config.mongoose.DB_URI}/${config.mongoose.DB}`;
    }),
  },
  notifications: {
    NOTIFICATION_SERVICE_ENABLED: true,
    NOTIFICATION_ENDPOINT: 'http://172.16.6.115:4751/api/v1/',
    NOTIFICATION_SECRET_KEY_ENCRYPTED: 'm6jtW75vxA4RBNc999gL+HvEsjKyz/fR8NFnyL3sUaVEdL5W7iqZuPWf8KyQIy0fqSlhzbryuCGQqQlOWX/xgCUyei3pT//BX7kvkq06QY/ANnzyVCN2Q1JfmcKOlhQ/tnWYrNPM6tt5TKbjYGp2rD6pd/Kv/CRJShOgtSI=',
    NOTIFICATION_SECRET_KEY: deferConfig(() => EncryptionService.decrypt(config.notifications.NOTIFICATION_SECRET_KEY_ENCRYPTED)),
    MAIL_ERRORS_TO: [],
  },
  redis: {
    URI: 'preprodrediscluster.lydffc.0001.euw1.cache.amazonaws.com',
    PORT: 6379,
    ENCRYPTED_PASSWORD: null,
    PASSWORD: deferConfig(() => EncryptionService.decrypt(config.redis.ENCRYPTED_PASSWORD)),
  },
};

export default config;
