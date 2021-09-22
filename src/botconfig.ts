import dotenv from 'dotenv';
dotenv.config();

export const config = {
    prefix: 'a.',
    dev: '774795377999085579',
    mongo: process.env.MONGO_URI,
    token: process.env.TOKEN
}