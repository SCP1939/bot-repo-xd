import { Message } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

export const command: Command = {
	name: 'paco',
	description: 'temaso',
	usage: '',
	example: [''],

	aliases: ['pako'],
	disabled: false,

	dev: true,

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			const em = client.emojis.cache.get(args[0])
			return msg.reply(`${em} existe`)
		} catch (err) {
			return msg.reply(`el emoji NO existe`)

		}
    }
}