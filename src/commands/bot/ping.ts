import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import { config, color as c } from '../../botconfig';
import { msgCritical } from '../../util/msgs';

export const command: Command = {
	name: 'ping',
	description: 'Muestra la latencia del bot',
	aliases: ['pong', 'p'],
	usage: '',
	example: [''],

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			const cmd = msg.content.slice(config.prefix.length).trim().split(/ +/g).shift()?.toLowerCase(); // Obtener comando
			let t1 = +new Date();

			const embed = new MessageEmbed()
				.setTitle(`🏓・${cmd == 'ping' || 'p' ? 'Pong' : 'Ping'}?`)
				.setFooter('Cargando...')
				.setColor(c.default);
			const message = await msg.channel.send({ embeds: [embed] });
			const newEmbed = message.embeds[0];

			let t2 = +new Date();

			// escala de color
			switch (true) {
				case t2 - t1 < 200:
					newEmbed.setColor(c.success);
					break;
				case t2 - t1 < 500 || t2 - t1 < 1000:
					newEmbed.setColor(c.warning);
					break;
				case t2 - t1 < 1000:
					newEmbed.setColor(c.error);
					break;
			}
			// Retornar ping
			newEmbed
				.setTitle(`🏓・${cmd == 'ping' || 'p' ? 'Pong' : 'Ping'}!`)
				.setDescription(`📨 Mensajes (HTTP): ${t2 - t1} ms. \n🛰 Discord (WS): ${client.ws.ping} ms.`)
				.setFooter('')
				.setTimestamp()

			return message.edit({ embeds: [newEmbed] });
		} catch (err) {
			return msgCritical(err, msg, client);
		}
	}
}
