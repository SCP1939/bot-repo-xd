import { Message, MessageEmbed, User } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

/*
	TODO Añadir el fuzzySearch para que cuando alguien escriba un
	nombre pues aparezca ese avatar
*/
// import FuzzySearch from 'fuzzy-search';

export const command: Command = {
	name: 'avatar',
	description: 'Muestra tu avatar o el de un usuario',
	aliases: ['av'],
	usage: '[usuario / ID]',
	example: ['', '@Normal', '698569950651873299'],

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			const avatar = msg.mentions.users.first()?.id || args[0] || msg.author.id;
			const user = await client.users.fetch(avatar);


			// embed
			const embed = new MessageEmbed()
				.setTitle(`🔎・Avatar de ${user.username}`)
				.setDescription(
					`${
						user.avatarURL() == null
							? '*Este usuario no tiene avatar*'
							: `[Avatar URL](${
								user.avatarURL({
									format: 'png',
									size: 1024,
									dynamic: true
							})})`
					}`
				)
				.setImage(
					`${
						user.avatarURL() == null
							? 'https://media.discordapp.net/attachments/889934987619606549/895015630258962483/2754.png'
							: user.avatarURL({
									format: 'png',
									size: 1024,
									dynamic: true
							})
					}`
				)
				.setFooter(`Pedido por ${msg.author.username}`)
				.setColor('RANDOM');

			return msg.channel.send({ embeds: [embed] });
		} catch (err) {
			return msg.channel.send('**😐・No encuentro a ese usuario**');
		}
	}
}
