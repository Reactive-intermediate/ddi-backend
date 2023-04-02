import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { WinstonModule } from 'nest-winston';
import configuration from './configuration';

const config = configuration();

const transportsDefault = () => {
  const transports: Transport[] = [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    // other transports...
  ];

  if (config.isProduction !== true) {
    // 開發環境
    const consoleTransport: Transport = new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('DDI', {
          colors: true,
        }),
      ),
    });

    transports.push(consoleTransport);
  }

  return transports;
};

export const winstionOptions = WinstonModule.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZZ' }),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('DDI', {
      colors: false,
    }),
  ),
  transports: transportsDefault(),
});
