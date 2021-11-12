import { Event, Command } from '../types';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { config } from '../botconfig';
import { msgCritical, msgError, msgErrorEmoji, msgInfo, msgWarn } from '../util/msgs';

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

			// El autor no es el desarrollador (Gátomo)
			if (
				data.dev !== undefined &&
				data.dev &&
				msg.author.id !== config.dev
			) {
				return msgErrorEmoji('No eres mi desarrollador', '🤖', msg, client)
			}

			// El comando está desactivado
			if (data.disabled) {
				return msgErrorEmoji('Ese comando está desactivado', '🛌', msg, client)
			}

			// Uso de comando en MD 
			// FIXME esto no funciona y no lo necesito

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
				return msgErrorEmoji('Ese comando solo puede ejecutarse en canales NSFW', '🔞', msg, client)
			}

			// Falta de permisos del bot
			if(data.perms !== undefined){
			if( !msg.guild!.me!.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
				if ((
					!msg.guild!.me!.permissions.has(
						Permissions.FLAGS.EMBED_LINKS
					)
				)
				|| (
					data.perms == 'ban' &&
					!msg.guild!.me!.permissions.has(
					Permissions.FLAGS.BAN_MEMBERS
					)
				) ||
				(
					data.perms == 'kick' &&
					!msg.guild!.me!.permissions.has(
					Permissions.FLAGS.KICK_MEMBERS
					)
				) ||
				(
					data.perms == 'manageRoles' && 
					!msg.guild!.me!.permissions.has(
					Permissions.FLAGS.MANAGE_ROLES
					)
				) ||
				(
					data.perms == 'manageMessages' &&
					!msg.guild!.me!.permissions.has(
					Permissions.FLAGS.MANAGE_MESSAGES
					)
				) ||
				(
					data.perms == 'manageEmojis' &&
					!msg.guild!.me!.permissions.has(
					Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS
					)
				) ||
				(
				data.perms == 'manageAKA' &&
				!msg.guild!.me!.permissions.has(
				Permissions.FLAGS.CHANGE_NICKNAME
				)
				)) {
					return msgError(`**No tengo el permiso ${data.perms}.**\n> Para activarlo, entra a "Roles" y activa administrador para evitar este problema en un futuro` , msg, client)
				}
			}
			}


			// Falta de permisos
			if (data.perms !== undefined) {
				if (
				(
					msg.author.id !== config.dev || // esto pa ser admin en todos lados xd
					msg.guild!.ownerId !== msg.author.id ||
					!msg.member?.permissions.has('ADMINISTRATOR')
				) &&
				(
					data.perms == 'ban' && // lo que no tengo hecho es q si el bot no tiene algunos permisos, tiene que decirlo
					!msg.member?.permissions.has(
					Permissions.FLAGS.BAN_MEMBERS
					)
				) ||
				(
					data.perms == 'kick' &&
					!msg.member?.permissions.has(
					Permissions.FLAGS.KICK_MEMBERS
					)
				) ||
				(
					data.perms == 'manageRoles' && 
					!msg.member?.permissions.has(
					Permissions.FLAGS.MANAGE_ROLES
					)
				) ||
				(
					data.perms == 'manageMessages' &&
					!msg.member?.permissions.has(
					Permissions.FLAGS.MANAGE_MESSAGES
					)
				) ||
				(
					data.perms == 'manageEmojis' &&
					!msg.member?.permissions.has(
					Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS
					)
				) ||
				(
					data.perms == 'manageAKA' &&
					!msg.member?.permissions.has(
					Permissions.FLAGS.CHANGE_NICKNAME
					)
				) ||
				(
				data.perms == 'owner' &&
				msg.guild!.ownerId !== msg.author.id
				)
				) {
					return msgError(`**Te falta el permiso** \`${data.perms}\` **para poder ejecutar el comando**`, msg, client);
				}
			}


			// Falta de argumentos
			if (data.args !== undefined) {
				// Embed
				const embed = new MessageEmbed()
					.setTitle(`<:Nerror:906291571522142309>・Error`)
					.setDescription('Faltan argumentos')
					.addField(
						'Uso correcto',
						`\`${data.name} ${data.usage}\``,
						false
					)
					.addField(
						'Ejemplo(s)',
						`${`\`\`\`\n${
							data.example[0] == ''
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


			
				if (args.length < data.args) {
					return msg.reply({
						embeds: [embed]
					});
				}
			}


			// recomendatorio de admin
			if (
				(
					msg.guild!.ownerId == msg.author.id ||
					msg.member?.permissions.has('ADMINISTRATOR')
				) &&
				!msg.guild!.me!.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			) {
				// Esto es para no enviar siempre el mensaje
				let axd = Math.floor(Math.random() * 10)
				if (axd > 6 && axd < 9) {
					msgWarn('**No tengo el permiso de administrador**.\n> Porfavor, entra a "Roles" y actívalos para evitar futuros problemas', msg, client);
				}
			}


			// Comando en desarrollo
			if (data.indev !== undefined) {
				if (data.indev == 'Alfa') {
					msgWarn('**El comando se encuentra en fase Alfa**, puede provocar fallos graves 🚧', msg, client)
				}
				if (data.indev == 'Beta') {
					msgWarn('**El comando se encuentra en fase Beta**, puede contener bugs', msg, client);
				}
				if (data.indev == 'Release Candidate') {
					msgInfo('**El comando se encuentra en fase Release Candidate**, estará disponible de forma oficial en poco tiempo', msg, client);
				}
			}
			/***********************/

			// Ejecución de comandos
			if (command) { // y el !command de antes es de adorno? -SCP
				//console.log('try in a try'); // momentos en los que tener ; te salva
				return (command as Command).run(client, msg, args);
			}
		} catch (err) {
			msgCritical(err, msg, client);
		}
	}
}
