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

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			// Argumentos
			const subreddit = args[1];

			// Reaccion de cargando
			msg.react('⏳');


			// Para que este bucle while?
			// Para obtener un elemento que contenga imagen
			let data;
			let t1: number, t2: number;

			t1 = +new Date();
			let loop = true;

			while (loop) {
				// Obtener datos
				const random = `https://www.reddit.com/r/${subreddit}/random.json`;
				const res = await axios.get(random);

				data = res.data[0].data.children[0].data;
				t2 = +new Date();

				// Tiempo de espera agotado (10 segundos)
				if (t2 - t1 >= 10000) {
					loop = false;
					// Eliminar reacción de cargando
					msg.reactions.cache.get('⏳')?.remove();

					return msg.channel.send(
						'⌛**・Tiempo de espera agotado (**`10000 ms.`**)**'
					);
				}

				// Si no contiene imagen se vuelve a pedir un dato aleatorio
				else if (
					data.url.endsWith('.png') ||
					data.url.endsWith('.jpg') ||
					data.url.endsWith('.gif')
				) {
					loop = false;
				}
			}

			// Evitar contenido nsfw
			// @ts-ignore
			if (!msg.channel.nsfw && data.over_18) {
				// Eliminar reacción de cargando
				msg.reactions.cache.get('⏳')?.remove();

				return msg.channel.send(
					`🔥**・El subreddit** \`${data.subreddit}\` **tiene contenido no apto para menores. dirígete a un canal NSFW y vuelve a intentarlo**`
				);
			} else {
				// Eliminar reacción de cargando
				msg.reactions.cache.get('⏳')?.remove();

				// Embed
				const embed = new MessageEmbed()
					.setTitle(`${data.title}`)
					.setURL(`https://www.reddit.com${data.permalink}`)
					.setAuthor(`r/${data.subreddit} - ${data.author}`)
					.setImage(`${data.url}`)
					.setFooter(
						`(Cargado en ${t2! - t1!} ms.) Upvotes: ${data.ups}`
					)
					.setColor('RANDOM');

				return msg.channel.send({ embeds: [embed] });
			}
		} catch (err) {
			msg.reactions.cache.get('⏳')?.remove();
			return msg.channel.send('**😐・No encuentro a ese subreddit**');
		}
	}
}
