import { Message, MessageEmbed, User } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import { msgCritical, msgError } from '../../util/msgs';
import { color as c } from '../../botconfig';


/*
	TODO Añadir el fuzzySearch para que cuando alguien escriba un
	nombre pues aparezca ese avatar
*/
// import FuzzySearch from 'fuzzy-search';

// Interrogación
let wtf =
	'https://media.discordapp.net/attachments/889934987619606549/895015630258962483/2754.png';


///////////////////////////////////////////////////////////////////////////////


export const command: Command = {
	name: 'avatar',
	description: 'Muestra tu avatar o el de un usuario',
	aliases: ['av'],
	usage: '[usuario / ID]',
	example: ['', '@Normal', '698569950651873299'],

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			try {
				const avatar =
					msg.mentions.users.first()?.id || args[0] || msg.author.id;
				const user = await client.users.fetch(avatar);

				// embed
				const embed = new MessageEmbed()
					.setTitle(`🔎・Avatar de ${user.username}`)
					.setDescription(
						`${
							user.avatarURL() == null
								? '*Este usuario no tiene avatar*'
								: `[Avatar URL](${user.avatarURL({
										format: 'png',
										size: 1024,
										dynamic: true
								})})`
						}`
					)
					.setImage(
						`${
							user.avatarURL() == null
								? wtf
								: user.avatarURL({
										format: 'png',
										size: 1024,
										dynamic: true
								})
						}`
					)
					.setFooter(`Pedido por ${msg.author.username}`)
					.setColor(c.default);

				return msg.channel.send({ embeds: [embed] });
			} catch (err) {
				return msgError('No encuentro a ese usuario', msg, client);
			}
		} catch (err) {
			return msgCritical(err, msg, client);
		}
	}
};
