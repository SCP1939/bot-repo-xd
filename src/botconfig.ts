import dotenv from 'dotenv';
dotenv.config();

export const config = {
    prefix: 'a.',
    dev: '685947556655923242',
    mongo: process.env.MONGO_URI,
    token: process.env.TOKEN
}