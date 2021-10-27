import { Client, Message } from 'discord.js';
import { Event } from '../types'

export const event: Event = {
	name: 'ready',
	run: async (client: any, msg: Message) => {
        console.log('Listo');


        // const guildID = '880947411432923136';
	    // const guild = client.guilds.fetch(guildID);

	    // let commands;

        // guild
        //     ? (commands = (await guild).commands)
        //     : (commands = client.application?.commands);

        // const command = client.commands.get(commands.commandName) || client.aliases.get(commands.commandName);
        
        // commands?.create({
        //     name: 'ping',
        //     description: 'Responde con pong'
        // });
    }
}