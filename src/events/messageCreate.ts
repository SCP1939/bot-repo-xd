import { Event, Command } from '../types';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { config } from '../botconfig';

/***********************/

export const event: Event = {
	name: 'messageCreate',
	run: async (client: any, msg: Message) => {
		try {
			// Prevenir bots, webhooks o cualquier mensaje que no tenga el prefix
			if (
				msg.author.bot ||
				msg.webhookId ||
				!msg.content.startsWith(config.prefix)
			)
				return;

			/***********************/

			// Definir argumentos y eso
			const args = msg.content
				.slice(config.prefix.length)
				.trim()
				.split(/ +/g); // Dividir argumentos
			const cmd = args.shift()?.toLowerCase(); // Obtener comando
			const command = client.commands.get(cmd) || client.aliases.get(cmd);
			const data = command; // Obtener datos del comando

			/***********************/

			// TODO poner embeds en los mensajes

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
			if (
				data.dev !== undefined &&
				data.dev &&
				msg.author.id !== config.dev
			) {
				return msg.reply({
					content: '🤖**・No eres mi desarrollador**',
					allowedMentions: { repliedUser: false }
				});
			}

			// El comando está desactivado
			if (data.disabled) {
				return msg.reply({
					content: '🛌**・Ese comando está desactivado**',
					allowedMentions: { repliedUser: false }
				});
			}

			// Uso de comando en MD

			if (
				(data.guildOnly || typeof data.guildOnly !== 'boolean') &&
				msg.channel.type == 'DM'
			) {
				return msg.reply({
					content: '🌎**・Ese comando está dedicado para servers**',
					allowedMentions: { repliedUser: false }
				});
			}

			// Comando fuera de canal NSFW
			// @ts-ignore
			if (data.nsfw && !msg.channel.nsfw) {
				return msg.reply({
					content:
						'🔥**・Ese comando solo puede ejecutarse en canales NSFW**',
					allowedMentions: { repliedUser: false }
				});
			}

			// TODO rehacer esto y crear como un mensaje plantilla
			// Falta de permisos
			if (data.perms !== undefined) {
				if (
					((msg.author.id !== config.dev ||
						msg.guild!.ownerId !== msg.author.id ||
						msg.member?.permissions.has('ADMINISTRATOR')) &&

					(data.perms == 'ban' &&
						msg.member?.permissions.has(
							Permissions.FLAGS.BAN_MEMBERS
						)) ||
					(data.perms == 'kick' &&
						msg.member?.permissions.has(
							Permissions.FLAGS.KICK_MEMBERS
						)) ||
					(data.perms == 'manageRoles' &&
						msg.member?.permissions.has(
							Permissions.FLAGS.MANAGE_ROLES
						)) ||
					(data.perms == 'manageMessages' &&
						msg.member?.permissions.has(
							Permissions.FLAGS.MANAGE_MESSAGES
						)) ||
					(data.perms == 'manageEmojis' &&
						msg.member?.permissions.has(
							Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS
						)) ||
					(data.perms == 'manageAKA' &&
						msg.member?.permissions.has(
							Permissions.FLAGS.CHANGE_NICKNAME
						)) ||
					(data.perms == 'owner' &&
						msg.guild!.ownerId == msg.author.id)
				)) {
					return msg.reply({
						content: `😐**・Te falta el permiso** \`${data.perms}\` **para poder ejecutar el comando**`,
						allowedMentions: { repliedUser: false }
					});
				}

				/*if(
					msg.author.id !== config.dev && // Un capricho mio xd
					msg.guild!.ownerId !== msg.author.id ||
					!msg.member?.permissions.has('ADMINISTRATOR')
				) {
					return msg.reply({
						content: `😐**・Te falta el permiso** \`${data.perms}\` **para poder ejecutar el comando**`,
						allowedMentions: { repliedUser: false }
					});
				}*/
			}

			// Falta de argumentos
			if (data.args !== undefined) {
				// Embed
				const embed = new MessageEmbed()
					.setTitle(`❌・Error`)
					.setAuthor(
						msg.author.username,
						msg.author.avatarURL({ dynamic: true })!
					)
					.setDescription('Faltan argumentos')
					.addField(
						'Uso correcto',
						`\`${data.name} ${data.usage}\``,
						false
					)
					.addField(
						'Ejemplo(s)',
						`${`\`\`\`\n${
							data.example[0] == '*preserve command*'
								? data.name
								: ''
						} ${
							data.example !== undefined
								? data.example?.join(`\n${data.name} `)
								: ''
						}\n\`\`\``}`,
						false
					)
					.setColor('RED')
					.setThumbnail(client.user!.avatarURL()!)
					.setFooter(
						'Recuerda: los argumentos `<>` son obligatorios y los `[]` son opcionales',
						client.user!.avatarURL()!
					);

				/*/ Ambos requeridos
				if (data.args.required !== undefined && data.args.requiredMention == true){
					args.shift();
					
					if (msg.mentions.users.first() == undefined) return msg.reply({ embeds: [embed] });
					if (args.length < data.args.required) return msg.reply({ embeds: [embed] });                
				}

				// Mención no requerida y falta de argumentos
				//@ts-ignore
				if (data.args.requiredMention !== true && msg.mentions.users.first()?.toString() == args[0] && data.args.required > 0) {
					args.shift();

					//@ts-ignore
					if (args!.length < data.args.required) return msg.reply({ embeds: [embed] });
				}

				// Mención requerida y cualquier argumento
				if (data.args.requiredMention == true && data.args.required == undefined) {
					if (msg.mentions.users.first()?.toString() !== args[0]) return msg.reply({ embeds: [embed] });
				}
				
				// Mención requerida
				if (data.args.requiredMention == true) {
					if (msg.mentions.users.first() == undefined) return msg.reply({ embeds: [embed] });
				}
				
				// Falta de argumentos
				if (data.args.required == undefined) {
					//@ts-ignore
					if (args.length < data.args.required) return msg.reply({ embeds: [embed] });
				}
				


				args.unshift(' ')
				*/
				if (args.length < data.args) {
					return msg.reply({
						embeds: [embed],
						allowedMentions: { repliedUser: false }
					});
				}
			}

			// Comando en desarrollo
			if (data.indev !== undefined) {
				if (data.indev == 'Alfa') {
					msg.reply({
						content:
							'🚧**・El comando se encuentra en fase Alfa**, puede provocar fallos graves',
						allowedMentions: {
							repliedUser: false
						}
					});
				}
				if (data.indev == 'Beta') {
					msg.reply({
						content:
							'🚧**・El comando se encuentra en fase Beta**, puede contener bugs',
						allowedMentions: {
							repliedUser: false
						}
					});
				}
				if (data.indev == 'Release Candidate') {
					msg.reply({
						content:
							'🚧**・El comando se encuentra en fase Release Candidate**, estará disponible de forma oficial en poco tiempo',
						allowedMentions: {
							repliedUser: false
						}
					});
				}
			}

			/***********************/

			// Ejecución de comandos
			if (command) {
				try {
					//console.log('try in a try'); // momentos en los que tener ; te salva
					(command as Command).run(client, msg, args);
				} catch (err) {
					msg.reply(
						`😐**・Se ha producido un error al ejecutar ese comando**\n\`\`\`\n${err}\n\`\`\`\n> Porfavor, ponte en contacto con mis desarrolladores y envíales una copia de este mensaje\n> https://discord.gg/whjyNhkk9V`
					);
				}
			}
		} catch (err) {
			msg.reply(
				`😐**・Se ha producido un error al ejecutar ese comando**\n\`\`\`\n${err}\n\`\`\`\n> Porfavor, ponte en contacto con mis desarrolladores y envíales una copia de este mensaje\n> https://discord.gg/whjyNhkk9V`
			);
		}
	}
};
