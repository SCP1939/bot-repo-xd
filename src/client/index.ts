import { Client, Collection, Intents, Message } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import { config } from '../botconfig';
import { Command, Event } from '../types';

/***********************/

/*const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});*/

/***********************/

// Extended Client
export default class extClient extends Client {
	// Colecciones de comandos y eventos
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();


	/***********************/


	public async init() {
		try {
			this.login(config.token);


			/***********************/


			/** COMANDOS **/
			const commandPath = join(__dirname, '..', 'commands');
			console.log('Commands loaded from', commandPath);
			// Revisar todos los comandos
			readdirSync(commandPath).forEach(async (dir) => {
				const cmds = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.js'));

				// Recopilar comandos
				for (const file of cmds) {
					const { command } = require(`${commandPath}/${dir}/${file}`);
					this.commands.set(command.name, command);
					console.log(`Loaded command \`${command.name}\``);
					// Recopilar alias
					if (typeof command.aliases !== 'undefined') {
						if (command.aliases.length !== 0) {
							command.aliases.forEach((alias: string) => {
								this.aliases.set(alias, command);
							});
						}
					}
				}
			});


			/** EVENTOS **/
			const eventPath = join(__dirname, '..', 'events');
			console.log('Events loaded from', eventPath);
			// Revisar todos los eventos
			readdirSync(eventPath).forEach(async (file) => {
				const { event } = require(`${eventPath}/${file}`);

				// Recopilar eventos
				this.events.set(event.name, event);
				console.log(`Loaded event \`${event.name}\``);

				// Ejecutar eventos
				this.on(event.name, event.run.bind(null, this));
			});

		} catch (err) {
			console.error(err);
		}
	}
}
