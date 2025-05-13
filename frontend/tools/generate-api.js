import path from 'node:path';
import * as dotenv from 'dotenv';
import { generateApi } from 'swagger-typescript-api';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

generateApi({
  name: 'api.ts',
  url: `${process.env.VITE_API_URL}/docs-json`,
  output: path.resolve(process.cwd(), './src/api/__generated__'),
  httpClientType: 'axios',
  unwrapResponseData: true,
  moduleNameFirstTag: true,
});
