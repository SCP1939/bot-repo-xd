import { Message } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

import axios from 'axios';

export const command: Command = {
	name: 'reddit',
	description: 'Muestra una publicación aleatoria de un subreddit',
    aliases: ['subreddit'],
	usage: '<subreddit>',
	example: ['discordapp', 'cat'],
    args: { required: 1 },
    indev: 'Alfa',
	run: async (client: extClient, msg: Message, args: string[]) => {
        try {
            const res = await axios.get('https://www.reddit.com/${}/random.json');
            console.log(res.data)
        } catch (err) {
            return msg.channel.send(
				'🤔**・Hmmm, parece que algo no salió bien. Vuelve a intentarlo!**'
			);
        }
    }
}