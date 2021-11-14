import { Message, MessageEmbed, MessageMentions } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

import { msgCritical } from '../../util/msgs';

import { exec } from 'child_process';

export const command: Command = {
	name: 'exec',
	description: 'Ejecuta un comando del terminal',

    dev: true,
	
	usage: '<comando>',
	example: ['sudo su'],
	args: 1,
	/*
    Emojis:
    warn: <:Nwarn:906291449228820480>
    - y +: <:Nmenos:906291293368508428> <:Nmas:906291031581003838> 
    Info: <:Ninfo:906291652488990820>
    Error: <:Nerror:906291571522142309>
    Correcto: <:Ncorrecto:906290866308661278>
*/
	run: async (client: extClient, msg: Message, args: string[]) => {
		const cmd = args.join(' ');
		try {
			let t1 = +new Date();
			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					let t2 = +new Date();
					return msg.channel.send(`<:Nerror:906291571522142309>・Error\n> **El terminal ha retornado un error**\n\`\`\`sh\n${error}\`\`\`⏱️ ${t2 - t1} ms.`);
				}
				if (stderr) {
					let t2 = +new Date();
					return msg.channel.send(`<:Nerror:906291571522142309>・Error\n> **El terminal ha retornado un error**\n\`\`\`sh\n${stderr}\`\`\`⏱️ ${t2 - t1} ms.`);
				}
				let t2 = +new Date();
				return msg.channel.send(`<:Ncorrecto:906290866308661278>・Salida\n> **Salida del terminal**\n\`\`\`sh\n${stdout}\`\`\`⏱️ ${t2 - t1} ms.`);
			});
		} catch (err) {
			msgCritical(err, msg, client)
		}
	}
}
