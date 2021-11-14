import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import { config, color as c } from '../../botconfig';
import { msgCritical, msgError } from '../../util/msgs';

let abc = 'abcdefghijklmnopqrstuvwxyz';
let regionalIndicator = '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿'.split(' ');

// let regionalIndicator: string[] = abc.split('').map(letter => `regional_indicator_${letter}`);

export const command: Command = {
	name: 'poll',
	description: 'Crea una votación simple',
	aliases: ['spoll', 'simplepoll'],

	args: 1,
	usage: '<Pregunta>, [Opción 1], [Opción 2]...',
	example: ['Normal es buen bot?', 'Que fruta prefieres?, Manzana, Naranja, Kiwi'],

	run: async (client: extClient, msg: Message, args: string[]) => {
		const arg = args.join(' ').split(',');
		const question = arg[0];
		const opts = arg.slice(1)
		try {
			msg.delete();

			if (opts.length < 2) {
				const embed = new MessageEmbed()
					.setTitle('📊・Encuesta')
					.setDescription(`> ${question}`)
					.setColor(c.default)
					.setTimestamp();
					
					const message = await msg.channel.send({ embeds: [embed] });
					message.react('<:Upvote:893980350139760700>');
					message.react('<:Downvote:907355445042216980>');

					return;
			} else if (opts.length > 20) {
				return msgError('Solo puedes poner 20 opciones máximo', msg, client);
			} else {
				const embed = new MessageEmbed()
					.setTitle('📊・Encuesta')
					.setDescription(`> ${question}${opts.map( opt => '\n' + regionalIndicator[opts.indexOf(opt)] + '**:** ' + opt).toString().replaceAll(',', '')}`)
					.setColor(c.default) // opts.map(opt => opt.split())
					.setTimestamp();

				const message = await msg.channel.send({ embeds: [embed] });

				for (const opt of opts) {
					message.react(`${regionalIndicator[opts.indexOf(opt)]}`);
				}
			}
			
		} catch (err) {
			return msgCritical(err, msg, client);
		}
	}
}
