import { Event, Command } from '../types';
import {
	Message,
	MessageEmbed,
	Permissions
} from 'discord.js';
import { config } from '../botconfig';

// NOTA: los msg.channel.send tienen el repliedUser porque antes eran msg.reply y me da pereza quitarlo


/***********************/


export const event: Event = {
	name: 'messageCreate',
	run: async (client: any, msg: Message) => {
		try {
			// Prevenir bots, webhooks o cualquier mensaje que no tenga el prefix
			if (msg.author.bot || msg.webhookId || !msg.content.startsWith(config.prefix))return;


			/***********************/


			// Definir argumentos y eso
			const args = msg.content.slice(config.prefix.length).trim().split(/ +/g); // Dividir argumentos
			const cmd = args.shift()?.toLowerCase(); // Obtener comando
			const command = client.commands.get(cmd) || client.aliases.get(cmd);
			const data = command; // Obtener datos del comando


			/***********************/


			// TODO poner embeds en los mensajes?


			// if if if if if if if if if if if if

			/*
				Los condicionales se ordenan en función de la prioridad de los permisos.
				Por ejemplo, si un comando es para administradores pero está desactivado, se mostrará que está desactivado,
				no se va a mostrar que no tiene los permisos suficientes para usarlo
			*/

			// No es un comando
			if (!command) {
				return;
			}

			// El autor no es el desarrollador
			if (data.dev !== undefined && data.dev && msg.author.id !== config.dev) {
				return msg.channel.send({
					content: '🤖**・No eres mi desarrollador**',
					allowedMentions: { repliedUser: false }
				});
			}

			// El comando está desactivado
			if (data.disabled) {
				return msg.channel.send({
					content: '🛌**・Ese comando está desactivado**',
					allowedMentions: { repliedUser: false }
				});
			}

			// Uso de comando en MD
			if (
				(data.guildOnly || typeof data.guildOnly !== 'boolean') &&
				msg.channel.type == 'DM'
			) {
				return msg.channel.send({
					content: '🌎**・Ese comando está dedicado para servers**',
					allowedMentions: { repliedUser: false }
				});
			}

			// Comando fuera de canal NSFW
			// @ts-ignore
			if (data.nsfw && !msg.channel.nsfw) {
				return msg.channel.send({
					content:
						'🔥**・Ese comando solo puede ejecutarse en canales NSFW**',
					allowedMentions: { repliedUser: false }
				});
			}

			// Falta de permisos
			if (
				msg.author.id !== config.dev || // Un capricho mio xd
				msg.guild!.ownerId !== msg.author.id ||
				!msg.member?.permissions.has('ADMINISTRATOR')
			) {
				if (
					(data.perms == 'ban' && msg.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS))||
					(data.perms == 'kick' && msg.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) ||
					(data.perms == 'manageRoles' && msg.member?.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) ||
					(data.perms == 'manageMessages' && msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) ||
					(data.perms == 'manageEmojis' && msg.member?.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) ||
					(data.perms == 'manageAKA' && msg.member?.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) ||
					(data.perms == 'owner' && msg.guild!.ownerId == msg.author.id)
				) {
					return msg.channel.send({
						content: `😐**・Te falta el permiso** \`${data.perms}\` **para poder ejecutar el comando**`,
						allowedMentions: { repliedUser: false }
					});
				}
			}


			// Falta de argumentos			
			if (data.args !== undefined) {
				// Embed
				const embed = new MessageEmbed()
				.setTitle(`❌・Error`)
				.setAuthor(msg.author.username ,msg.author.avatarURL()!)
				.setDescription('Faltan argumentos')
				.addField('Uso correcto', `\`${data.name} ${data.usage}\``, false)
				.addField('Ejemplo(s)', `${'```\n' + data.name + ' ' + data.example?.join(`\n${data.name} `)+ '```'}`, false)
				.setColor('RED')
				.setThumbnail(client.user!.avatarURL()!)
				.setFooter('Recuerda: los argumentos <> son obligatorios y los [] son opcionales', client.user!.avatarURL()!)


				// Ambos requeridos
				if (data.args.required !== undefined && data.args.requiredMention == true){
					args.shift();
					
					if (msg.mentions.users.first() == undefined) return msg.channel.send({ embeds: [embed] });
					if (args.length < data.args.required) return msg.channel.send({ embeds: [embed] });                
				}

				// Mención no requerida y falta de argumentos
				//@ts-ignore
				if (data.args.requiredMention !== true && msg.mentions.users.first()?.toString() == args[0] && data.args.required > 0) {
					args.shift();

					//@ts-ignore
					if (args!.length < data.args.required) return msg.channel.send({ embeds: [embed] });
				}

				// Mención requerida y cualquier argumento
				if (data.args.requiredMention == true && data.args.required == undefined) {
					if (msg.mentions.users.first()?.toString() !== args[0]) return msg.channel.send({ embeds: [embed] });
				}
				
				// Mención requerida
				if (data.args.requiredMention == true) {
					if (msg.mentions.users.first() == undefined) return msg.channel.send({ embeds: [embed] });
				}
				
				// Falta de argumentos
				if (data.args.required == undefined) {
					//@ts-ignore
					if (args.length < data.args.required) return msg.channel.send({ embeds: [embed] });
				}
				


				args.unshift(' ')
				
			}

			// Comando en desarrollo
			if (data.indev !== undefined) {

				if (data.indev == 'Alfa') {
					msg.channel.send({
						content: '🚧**・El comando se encuentra en fase Alfa**, puede provocar fallos graves',
						allowedMentions: {
							repliedUser: false
						}
					});
				}
				if (data.indev == 'Beta') {
					msg.channel.send({
						content: '🚧**・El comando se encuentra en fase Beta**, puede contener bugs',
						allowedMentions: {
							repliedUser: false
						}
					});
				}
				if (data.indev == 'Release Candidate') {
					msg.channel.send({
						content: '🚧**・El comando se encuentra en fase Release Candidate**, estará disponible de forma oficial en poco tiempo',
						allowedMentions: {
							repliedUser: false
						}
					});
				}
				
				
			}


			/***********************/

			console.log('Try')
			// Ejecución de comandos
			if (command) {
				try {
					console.log('try in a try'); // momentos en los que tener ; te salva
					(command as Command).run(client, msg, args);
				} catch (err) {
					console.log('catch into a try');
					msg.channel.send(`😐**・Se ha producido un error al ejecutar ese comando**\n\`\`\`\n${err}\n\`\`\`\n> Porfavor, ponte en contacto con mis desarrolladores y envíales una copia de este mensaje\n> https://discord.gg/whjyNhkk9V`)
				}
			}
		} catch (err) {
			console.log('Catch')
			msg.channel.send(`😐**・Se ha producido un error al ejecutar ese comando**\n\`\`\`\n${err}\n\`\`\`\n> Porfavor, ponte en contacto con mis desarrolladores y envíales una copia de este mensaje\n> https://discord.gg/whjyNhkk9V`)
		}
	}
}
