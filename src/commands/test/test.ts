import { Message } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

export const command: Command = {
	name: 'test',
	description: 'temaso',

	aliases: ['t'],
	disabled: false,

    guildOnly: false,
    dev: true,

	run: async (client: extClient, msg: Message, args: string[]) => {
        return 'ok'
    }
}