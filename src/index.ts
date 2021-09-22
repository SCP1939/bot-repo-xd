import { Intents } from 'discord.js';
import extClient from './client';

new extClient({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
}).init();