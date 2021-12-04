import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import { msgCritical, msgError } from '../../util/msgs';
import { color as c } from '../../botconfig';

// user.roles.highest.position
export const command: Command = {
	name: 'ban',
	description: 'Banea a un miembro del servidor',
	aliases: ['banmember'],
	usage: '<miembro> [motivo]',
	example: ['@usuario compartir contenido inadecuado', '@usuario', '698568850651873299'],

	disabled: false,
	args: 1,
	dev: true,

	perms: 'ban',
	indev: 'Alfa',
	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			try {
				const member = msg.mentions.users.first()?.id || args[0] || msg.author.id;
				const user = await msg.guild!.members.fetch(member);

				const reason = args.slice(1).join(' ') || 'Sin motivo';

				// autoexpulsarte xd
				if (user.id == msg.author.id) {
					return msgError('No puedes expulsarte', msg, client);
				}

				// Expulsar al bot
				if (user.id == client.user!.id) {
					return msgError('No puedes banearme', msg, client);
				}

				// Usuario no kickeable
				if (!user.bannable) {
					return msgError('No puedo banear a ese miembro', msg, client);
				}

				// rol igual o superior
				if (msg.member!.roles.highest.position <= user.roles.highest.position) {
					return msgError('No puedes banear a un miembro con un rol igual o superior al tuyo', msg, client)
				}
				
				
				// Mensaje de md
				const embedDM = new MessageEmbed()
				.setTitle(`Has sido baneado de ${user.guild}`)
				.addField('Moderador responsable: ', msg.author.username, false)
				.addField('Motivo: ', `\`${reason}\``, false)
				.setColor(c.error)
				.setThumbnail(msg.guild?.iconURL({ dynamic: true, format: 'png' })!)
				.setFooter(msg.author.username, msg.author.avatarURL()!)
				.setTimestamp();
				
				let mdStatus = true;
				user.send({ embeds: [embedDM] })
				.catch(() => {
					mdStatus = false;
				});
				

				// Banear (primero se envía el MD y luego el ban)
				await user.ban({reason:`**-Mod responsable:** ${msg.author.tag}\n**- Motivo:** ${reason}`, days: 1});


				// Mensaje del server
				const embed = new MessageEmbed()
					.setTitle(`✈️・${user.user.username} baneado`)
					.addField('Moderador responsable: ', msg.author.toString(), false)
					.addField('Motivo: ', `\`${reason}\``, false)
					.addField('MD enviado: ', mdStatus ? '✅ Sí' : '❎ No', false)
					.setColor(c.default)
					.setThumbnail(user.user.avatarURL({ dynamic: true })!)
					.setFooter(msg.author.username, msg.author.avatarURL()!)
					.setTimestamp();
				
				msg.channel.send(mdStatus.toString())
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