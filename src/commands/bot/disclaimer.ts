import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import { config, color as c } from '../../botconfig';
import { msgCritical } from '../../util/msgs';

export const command: Command = {
	name: 'disclaimer',
	description: 'Aviso de renuncia de responsabilidad',
	usage: '',
	example: [''],

	run: async (client: extClient, msg: Message, args: string[]) => {
		try {
			const embed = new MessageEmbed()
				.setTitle(`<:Nwarn:906291449228820480>・RENUNCIA DE RESPONSABILIDAD`)
				.setDescription('Discord nos obliga a advertir a todos los usuarios del tratamiendo que tenemos con los mensajes')
				.addField('¿Qué pasa si hago un mal uso del bot?', '> No nos hacemos responsables de cómo uses el bot. Todo lo que hagas quedará bajo tu responsabilidad. Cualquier uso indebido del bot no nos afectará, al igual que con fallos graves del bot (ej. un usuario normal puede banear)')
				.addField('¿Qué datos se recopilan?', '> Para que el bot funcione correctamente, recopilamos todos los mensajes para poder reaccionar en caso de que empieze con el prefix. De lo contrario, no funcionaría ningún comando', false)
				.addField('¿Qué datos se compartirán?', '> No compartiremos ningún dato con nadie', false)
				.addField('¿Qué datos se almacenan?', '> Actualmente no se almacena ningún dato, pero esto cambiará en un futuro para poder hacer uso de una base de datos', false)
				.addField('¿Qué datos se eliminan?', '> Actualmente no se almacena ningún dato, pero en un futuro, se hará lo siguiente:\n> **1.** Se eliminarán los datos con cierta antigüedad\n > **2.** Se eliminarán los datos sin relevancia\n> **3.** Se eliminarán todos los datos de un usuario si éste lo solicita', false)
				.addField('¿Puedo impedir que se recopilen los datos?', '> Sí, puedes solicitar que no se recopilen los datos tanto a nivel personal (usuario) como a nivel comunitario (server). Hacer esto puede suponer que el bot deje de funcionar', false)
				.addField('¿Dónde lo solicito?', '> Para solicitar cualquier cosa, debes entrar en el server de soporte (abajo invite)')
				.setFooter('Disculpe las molestias')
				.setColor(c.warning);
			
			return msg.reply({ content: 'https://discord.gg/E2yBpMq2Km', embeds: [embed] });
		} catch (err) {
			return msgCritical(err, msg, client);
		}
	}
}
