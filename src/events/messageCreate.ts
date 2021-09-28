import { Event, Command } from '../types';
import {
	Message,
	MessageMentions,
	MessagePayload,
	Permissions
} from 'discord.js';
import { config } from '../botconfig';


/***********************/


export const event: Event = {
	name: 'messageCreate',
	run: async (client: any, msg: Message) => {
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
			return msg.reply({
				content: '🤖**・No eres mi desarrollador**',
				allowedMentions: { repliedUser: false }
			});
		}

		// El comando está desactivado
		if (data.disabled) {
			return msg.reply({
				content: '🛌**・Este comando está desactivado**',
				allowedMentions: { repliedUser: false }
			});
		}

		// Uso de comando en MD
		if (
			(data.guildOnly || typeof data.guildOnly !== 'boolean') &&
			msg.channel.type == 'DM'
		) {
			return msg.reply({
				content: '🌎**・Este comando está dedicado para servers**',
				allowedMentions: { repliedUser: false }
			});
		}

		// Comando fuera de canal NSFW
		// @ts-ignore
		if (data.nsfw && !msg.channel.nsfw) {
			return msg.reply({
				content:
					'🔥**・Este comando solo puede ejecutarse en canales NSFW**',
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
				return msg.reply({
					content: `😐**・Te falta el permiso** \`${data.perms}\` **para poder ejecutar el comando**`,
					allowedMentions: { repliedUser: false }
				});
			}
		}

		// Falta de argumentos
		/*if (data.args.args) {
            if (args.length < data.args.required || data.args.mention.mention == true && data.args.mention.required == true && msg.mentions.users.first() == undefined) {
                return msg.reply({
                    content: `💠 | **Faltan argumentos**\n> Uso correcto:\n\`\`\`\n${data.usage}\`\`\`\n> Ejemplo: \n\`\`\`\n${data.example.join().replaceAll(',', '\n')}\`\`\``,
                    allowedMentions: { repliedUser: false }
                })
            }
        }*/
        
		if (data.args !== undefined) {
            let argsAnswer = `💠 | **Faltan argumentos**\n> Uso correcto:\n\`\`\`\n${
                data.usage
            }\`\`\`\n> Ejemplo: \n\`\`\`\n${ //@ts-ignore
                data.example.join().replaceAll(',', '\n')
            }\`\`\``;
            console.log(args);

            
            
            // Ambos requeridos
            if (data.args.required !== undefined && data.args.requiredMention == true){
                args.shift();
				
                if (msg.mentions.users.first() == undefined) return msg.reply({
                    content: argsAnswer,
                    allowedMentions: { repliedUser: false }
                })
                if (args.length < data.args.required) return msg.reply({
                    content: argsAnswer,
                    allowedMentions: { repliedUser: false }
                })
                
            }
            // Mención no requerida y falta de argumentos
			//@ts-ignore
            if (data.args.requiredMention !== true && msg.mentions.users.first()?.toString() == args[0] && data.args.required > 0) {

                args.shift();

				//@ts-ignore
                if (args!.length < data.args.required) return msg.reply({
                    content: argsAnswer,
                    allowedMentions: { repliedUser: false }
                });
            }

            // Mención requerida y cualquier argumento
            if (data.args.requiredMention == true && data.args.required == undefined) {

                console.log(args);

                if (msg.mentions.users.first()?.toString() !== args[0]) return msg.reply({
                    content: argsAnswer,
                    allowedMentions: { repliedUser: false }
                });
            }
            
			// Mención requerida
			if (data.args.requiredMention == true) {
                
                if (msg.mentions.users.first() == undefined) return msg.reply({
                    content: argsAnswer,
                    allowedMentions: { repliedUser: false }
                });;
			}
            
			// Falta de argumentos
			if (data.args.required == undefined) {

				//@ts-ignore
                if (args.length < data.args.required) return msg.reply({
                        content: argsAnswer,
                        allowedMentions: { repliedUser: false }
                    });
			}
            


            args.unshift(' ')
            
		}

		// Comando en desarrollo
		if (data.indev !== undefined) {

			if (data.indev == 'a') {
				msg.reply({
					content: '🚧**・El comando se encuentra en fase Alfa**, puede provocar fallos graves',
					allowedMentions: {
						repliedUser: false
					}
				});
			}
			if (data.indev == 'b') {
				msg.reply({
					content: '🚧**・El comando se encuentra en fase Beta**, puede contener bugs',
					allowedMentions: {
						repliedUser: false
					}
				});
			}
			if (data.indev == 'rc') {
				msg.reply({
					content: '🚧**・El comando se encuentra en fase Release Candidate**, estará disponible de forma oficial en poco tiempo',
					allowedMentions: {
						repliedUser: false
					}
				});
			}
			
			
		}


        /***********************/


		// Ejecución de comandos
		if (command) {
			(command as Command).run(client, msg, args);
		}
	}
}
