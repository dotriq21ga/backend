import { TOKEN_EXPIRE } from './constant'

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

export const CONFIG_JWT = {
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: TOKEN_EXPIRE },
}