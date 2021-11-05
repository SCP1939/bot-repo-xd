// Template de comandos

import { Message } from 'discord.js';
//@ts-ignore
import extClient from '../../client';
//@ts-ignore
import { Command } from '../../types';

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

	}
};
