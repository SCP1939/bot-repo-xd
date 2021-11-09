import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import axios from 'axios';

import { color as c } from '../../botconfig';
import { msgCritical, msgErrorEmoji, msgError } from '../../util/msgs';

export const command: Command = {
	name: 'reddit',
	description: 'Muestra una publicación aleatoria de un subreddit',
	aliases: ['subreddit'],
	usage: '<subreddit>',
	example: ['discordapp', 'cat'],
	args: 1,

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			// Argumentos
			const subreddit = args[0];
			
			// Reaccion de cargando
			msg.react('<a:Nloading:907355201688698951>');
			
			
			// Para que este bucle while?
			// Para obtener un elemento que contenga imagen
			let data;
			let t1: number, t2: number;
			
			t1 = +new Date();
			let loop = true;
			
			try {
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
						msg.reactions.removeAll();

						return msgErrorEmoji('Tiempo de espera agotado (`10000 ms.`)', '⌛', msg, client)
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
					msg.reactions.removeAll();
					
					return msgErrorEmoji(`**El subreddit** \`${data.subreddit}\` **tiene contenido no apto para menores.**\n> dirígete a un canal NSFW y vuelve a intentarlo`, '🔞', msg, client)
				} else {
					// Eliminar reacción de cargando
					msg.reactions.removeAll();
					
					// Embed
					const embed = new MessageEmbed()
					.setTitle(`${data.title}`)
					.setURL(`https://www.reddit.com${data.permalink}`)
					.setAuthor(`r/${data.subreddit} - ${data.author}`)
					.setImage(`${data.url}`)
					.setFooter(
						`(Cargado en ${t2! - t1!} ms.) Upvotes: ${data.ups}`
						)
						.setColor(c.default);
						
						const message = await msg.channel.send({ embeds: [embed] });
						message.react('<:Upvote:893980350139760700>');
						message.react('<:Downvote:907355445042216980>');
						

						return;
					}
				} catch (err) {
					msg.reactions.removeAll();
					return msgError('No encuentro a ese subreddit', msg, client)
				}
		} catch (err) {
			return msgCritical(err, msg, client);
		}
	}
}
