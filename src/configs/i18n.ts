import { I18nOptions } from 'nestjs-i18n';
import * as path from 'path';
import { AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';

export const i18nOptions: I18nOptions = {
  fallbackLanguage: 'zh',
  fallbacks: {
    'en-*': 'en',
    'zh-*': 'zh',
  },
  loaderOptions: {
    path: path.join(__dirname, '../i18n/'),
    watch: true,
  },
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
  ],
  typesOutputPath: path.join(__dirname, '../../src/i18n/i18n.type.ts'),
};
