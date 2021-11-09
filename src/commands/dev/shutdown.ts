import { Message, MessageEmbed, MessageMentions } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

import { color as c } from '../../botconfig';
import { msgCritical } from '../../util/msgs';
import sleep from '../../util/sleep'

const { version } = require('../../../package.json');


export const command: Command = {
	name: 'shutdown',
	description: 'Apaga el bot',

    dev: true,
	
	usage: '',
	example: [''],
	
	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			const embed = new MessageEmbed()
				.setColor(c.default)
				.setTitle('<a:Nloading:907355201688698951>・APAGANDO EL BOT')
				.setDescription('> El bot se apagará en unos segundos.')
				.setImage('https://media.giphy.com/media/ZBbI1acy7Kgru0ODoC/giphy.gif')
				.setFooter(
					`Normal ${version}`,
					client.user!.avatarURL()!
				);
			msg.reply({ embeds: [embed] });

			await sleep(5000);
			
			client.destroy();
			process.exit(0);
		} catch (err) {
			msgCritical(err, msg, client)
		}
	}
}
