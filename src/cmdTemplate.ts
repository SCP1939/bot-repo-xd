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
    
    nsfw: false,
	disabled: false,
	dev: false,
    
	usage: '',
	example: [''], // si es '', se muestra el comando solo en el ejemplo
    args: 1,

    perms: '',
    indev: '',
	run: async (client: extClient, msg: Message, args: string[]) => {
        return
    }
}