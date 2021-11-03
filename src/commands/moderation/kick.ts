// Template de comandos

import { Message } from 'discord.js';
//@ts-ignore
import extClient from '../../client';
//@ts-ignore
import { Command } from '../../types';

export const command: Command = {
	name: 'kick',
	description: 'Expulsa a un usuario del servidor',
    aliases: ['kickmember'],
	usage: '<usuario> [motivo]',
	example: ['', '@usuario spam', '@usuario', '012345678901234567'],


    args: 1,

    perms: 'kick',
    indev: 'Alfa',
	run: async (client: extClient, msg: Message, args: string[]) => {
        return args
    }
}