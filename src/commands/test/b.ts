import { Message } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

export const command: Command = {
	name: 'cebolla',
	description: 'temaso',

	aliases: ['onion'],
	perms: 'manageAKA',
	
	dev: true,

	run: async (client: extClient, msg: Message, args: string[]) => {
        return msg.reply('cebollaxd')
    }
}