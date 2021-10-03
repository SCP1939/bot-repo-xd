import { Message, MessageEmbed } from 'discord.js';
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
			const subreddit = args[1];
			let data;

			let loop = true;
			while (loop) {
				const random = `https://www.reddit.com/r/${subreddit}/random.json`;

				const res = await axios.get(random);
				data = res.data[0].data.children[0].data;

				if (data.url.endsWith('.png') || data.url.endsWith('.jpg'))
					loop = false;
			}


			// @ts-ignore
			if (!msg.channel.nsfw && data.over_18) {
				return msg.channel.send(
					`🔥**・El subreddit** \`${data.subreddit}\` **tiene contenido no apto para menores. dirígete a un canal NSFW y vuelve a intentarlo**`
				);
			} else {
				// El embed tarda en enviarse
				const embed = new MessageEmbed()
					.setTitle(`${data.title}`)
					.setURL(`https://www.reddit.com${data.permalink}`)
					.setAuthor(`${data.subreddit} - ${data.author}`)
					.setImage(`${data.url}`)
					.setFooter(`<:upvote:893980350139760700> ${data.ups}`)
					.setColor('ORANGE');

				return msg.channel.send({ embeds: [embed] });
			}

		} catch (err: any) {
			return msg.channel.send('**😐・No encuentro a ese subreddit**');
		}
	}
}
