// Template de comandos

import { Message } from 'discord.js';
// @ts-ignore
import { Command } from '../../types';
// @ts-ignore
import extClient from '../../client';
// @ts-ignore
import { msgCritical } from '../../util/msgs';
// @ts-ignore
import { color as c } from '../../botconfig';

export const command: Command = {
	name: '',
	description: '',
    aliases: [''],
    
    nsfw: false,
	disabled: false,
	dev: false,
    
	usage: '',
	example: [''], // si es '', se muestra el comando sin argumentos en el ejemplo
    args: 1,

    perms: '',
    indev: '',
	run: async (client: extClient, msg: Message, args: string[]) => {
        try {

        } catch (err) {
			return msgCritical(err, msg, client);
		}
    }
}