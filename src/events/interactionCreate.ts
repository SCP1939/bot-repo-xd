// Esta mierda no funciona. dice cannot read property isCommand of undefined

import { Event } from '../types';
import { Interaction, Message, CommandInteraction } from 'discord.js';
import { config } from '../botconfig';


export const event: Event = {
    name: 'interactionCreate',
	// He añadido el ts ignore porque el parametro "interaction" no existe. antes existia xd
	//@ts-ignore
    run: async (client: any, msg: Message, interaction: CommandInteraction) => {
		msg.channel.send(`Lo siento pero no soporto slash commands debido a un error. Prueba a escribir \`${config.prefix}ping\` mientras arreglamos el error :)`)
		/*if(!interaction.isCommand()) return; 
		
		const name = interaction.commandName;
		const opts = interaction.options;
		
		if (name == 'ping') {
			interaction.reply('pong');
		}*/
		
    }
}