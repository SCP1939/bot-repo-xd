import { Message, MessageEmbed } from 'discord.js';
import { config } from '../../botconfig';
import extClient from '../../client';
import { Command } from '../../types';

export const command: Command = {
	name: 'ping',
	description: 'Muestra la latencia del bot',
	aliases: ['pong'],
	usage: '',
	example: [''],

	run: async (client: extClient, msg: Message, args: string[]) => {
		const cmd = msg.content.slice(config.prefix.length).trim().split(/ +/g).shift()?.toLowerCase(); // Obtener comando
		let t1 = +new Date();

		const embed = new MessageEmbed()
			.setTitle(`🏓・${cmd == 'ping' ? 'Pong' : 'Ping'}?`)
			.setFooter('Cargando...')
			.setColor('BLURPLE');
		const message = await msg.channel.send({ embeds: [embed] });
		const newEmbed = message.embeds[0];

		let t2 = +new Date();


		// Retornar ping
		newEmbed
			.setTitle(`🏓・${cmd == 'ping' ? 'Pong' : 'Ping'}!`)
			.setDescription(`📨 Mensajes (HTTP): ${t2 - t1} ms. \n🛰 Discord (WS): ${client.ws.ping} ms.`)
            .setFooter('')
            .setTimestamp()

		return message.edit({ embeds: [newEmbed] });
	}
};
