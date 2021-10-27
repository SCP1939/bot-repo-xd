import { Message } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

export const command: Command = {
	name: 'cebolla',
	description: 'temaso',

	aliases: ['onion'],
	//perms: 'manageAKA',
	
	usage: '',
	example: [''],
	
	dev: false,

	run: async (client: extClient, msg: Message, args: string[]) => {
        return msg.reply('cebollaxd')
    }
}