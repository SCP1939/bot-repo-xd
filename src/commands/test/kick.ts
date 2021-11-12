import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import { msgCritical, msgError } from '../../util/msgs';
import { color as c } from '../../botconfig';

export const command: Command = {
	name: 'kick',
	description: 'Expulsa a un miembro del servidor',
	aliases: ['kickmember'],
	usage: '<miembro> [motivo]',
	example: ['', '@usuario spam', '@usuario', '012345678901234567'],

	args: 1,

	perms: 'kick',
	indev: 'Alfa',
	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			try {
				const member = msg.mentions.users.first()?.id || args[0]  || msg.author.id
				const user = await msg.guild!.members.fetch(member);
				if (user.id == msg.author.id) {
					return msgError('No puedes expulsarte', msg, client);
				}
				if (user.id == client.user!.id) {
					return msgError('No puedes expulsarme', msg, client);
				}
				if (!user.kickable) {
					return msgError('No puedo expulsar a ese miembro', msg, client);
				} 
				
				const reason = args.slice(1).join(' ') || 'Sin motivo';
				
				await user.kick(`-Mod: ${msg.author.tag}\n- Motivo: ${reason}`);

				// md
				const embedDM = new MessageEmbed()
					.setTitle(`Has sido expulsado de ${user.guild}`)
					.addField('Moderador responsable: ', msg.author.username, false)
					.addField('Motivo: ', `\`${reason}\``, false)
					.setColor(c.error)
					.setThumbnail(user.user.avatarURL({ dynamic: true })!)
					.setFooter(msg.author.username, msg.author.avatarURL()!)
					.setTimestamp();

					user.send({ embeds: [embedDM] });
				// server
				const embed = new MessageEmbed()
					.setTitle(`✈️・${user.user.username} expulsado`)
					.addField('Moderador responsable: ', msg.author.toString(), false)
					.addField('Motivo: ', `\`${reason}\``, false)
					.setColor(c.default)
					.setThumbnail(user.user.avatarURL({ dynamic: true })!)
					.setFooter(msg.author.username, msg.author.avatarURL()!)
					.setTimestamp();
					
					return msg.reply({ embeds: [embed] });
			} catch (err) {
				return msgError('No he encontrado a ese miembro', msg, client);
			}
        } catch (err) {
			return msgCritical(err, msg, client);
		}
	}
};

/*
if (msg.mentions!.members!.first()) {
	if (msg.mentions.members?.first()!.kickable) {
		if (args.length > 1) {
			msg.mentions
				?.members!.first()!
				.kick(`Mod responsable: ${msg.author.username}#${msg.author.tag} - Motivo: ${args.slice(1).join(' ')}`);
		} else {
			msg.mentions?.members!.first()!.kick(); // by github copilot en parte xd
		}
	}
}
*/