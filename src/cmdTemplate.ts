// Template de comandos

import { Message } from 'discord.js';
//@ts-ignore
import extClient from '../../client';
//@ts-ignore
import { Command } from '../../types';

export const command: Command = {
	name: '',
	description: '',
    aliases: [''],
	usage: '',
	example: [''],

    nsfw: false,
	disabled: false,
	guildOnly: false,
	dev: false,

    args: {
        required: 3,
        requiredMention: false
    },

    perms: '',
    indev: '',
	run: async (client: extClient, msg: Message, args: string[]) => {
        return
    }
}