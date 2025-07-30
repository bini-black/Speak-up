import fs from 'fs';
import path from 'path';

export const privateKey = fs.readFileSync(path.resolve('./server/keys/private.pem'), 'utf8');
export const publicKey = fs.readFileSync(path.resolve('./server/keys/public.pem'), 'utf8');
