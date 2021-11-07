import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import axios from 'axios';

import { color as c } from '../../botconfig';
import { msgCritical, msgError } from '../../util/msgs';


export const command: Command = {
	name: 'cat',
	description: 'Muestra un gatito guapísimo',
	aliases: ['kitty', 'cats', 'meow'],
	usage: '',
	example: [''],

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			// Embed
			const embed = new MessageEmbed()
			.setTitle('🐱・Miau?')
					.setFooter('Cargando...')
					.setColor(c.default);
					
				const message = await msg.channel.send({ embeds: [embed] });
				
				const newEmbed = message.embeds[0];
	
	
			try {
				// Sin dudarlo la mejor API (excepto por el ping)
				let t1 = +new Date();
				const res = await axios.get('https://cataas.com/cat?json=true');
				let t2 = +new Date();
	
	
				// Retornar gato
				newEmbed
					.setTitle('😻・Aquí tienes un gatito guapísimo')
					.setImage('https://cataas.com' + res.data.url)
					.setColor(c.default)
					.setFooter(`(Cargado en ${t2 - t1} ms.) Hecho con cataas.com`);
	
				message.react('❤️');
	
				return message.edit({ embeds: [newEmbed] });
	
			} catch (err) {
				return msgError('Ha habido un problema obteniendo el gatito. Vuelve a intentarlo!', msg, client);
			}
		} catch (err) {
			return msgCritical(err, msg, client);
		}
	}
}