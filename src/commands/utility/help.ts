import { Message, MessageEmbed } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

// El algoritmo para obtener los comandos lo he improvisado
// Seguramente sea una mierda pero funciona xd

export const command: Command = {
	name: 'help',
	description: 'Obtén ayuda de los comandos disponibles o de uno en concreto',

    usage: 'help [comando]',
    example: [
        'help',
        'help ping'
    ],
	aliases: ['h'],

	run: async (client: extClient, msg: Message, args: string[]) => {

        // Argumentos
		let command = args[0];


        // Listado donde se guardarán los comandos
		let cmdList: any = [
			{ cat: 'test', cmds: [] },
			{ cat: 'reaction', cmds: [] },
			{ cat: 'utility', cmds: [] },
			{ cat: 'moderation', cmds: [] },
			{ cat: 'fun', cmds: [] },
			{ cat: 'config', cmds: [] },
			{ cat: 'beta-rc', cmds: [] },
			{ cat: 'bot', cmds: [] }
		];

        // Obtener todos los comandos y clasificarlos
		client.commands.forEach((e) => {
			switch (e.path) {
				case 'test':
					cmdList[0].cmds.push(e);
					break;
				case 'reaction':
					cmdList[1].cmds.push(e);
					break;
				case 'utility':
					cmdList[2].cmds.push(e);
					break;
				case 'moderation':
					cmdList[3].cmds.push(e);
					break;
				case 'fun':
					cmdList[4].cmds.push(e);
					break;
				case 'config':
					cmdList[5].cmds.push(e);
					break;
				case 'bot':
					cmdList[6].cmds.push(e);
					break;
			}
		});

        // Obtener comandos del listado mencionado antes
		function getCmds(cat: string): string[] {
			let returnVariable: string[] = [];
			cmdList
				.find((e: any) => e.cat == cat)
				.cmds.forEach((e: any) => returnVariable.push(e.name));
			return returnVariable;
		}


        // Mostrar mensajes en función de los argumentos
        if (command == undefined){
            // Listado general de comandos

            // Embed
            const embed = new MessageEmbed()
                .setTitle('😁・Lista de comandos')
                .setDescription(
                    `Hola! soy Normal, un bot multipropósito en español. Estos son todos los comandos que tengo disponible.\nSi deseas que haya un comando nuevo, no dudes en usar el comando \`suggest\`, estaremos encantados de escuchar tus sugerencias`
                )
                .addField('😆・Diversión', `\`${getCmds('fun').join('`, `')}\``)
                .addField('👋・Reacción', `\`${getCmds('reaction').join('`, `')}\``)
                .addField('🔨・Moderación', `\`${getCmds('moderation').join('`, `')}\``)
                .addField('📺・Utilidad', `\`${getCmds('utility').join('`, `')}\``)
                .addField('🍎・Bot', `\`${getCmds('bot').join('`, `')}\``)
                .addField('🔧・Configuración', `\`${getCmds('config').join('`, `')}\``)
                .addField('💡・Alfa / Beta / Release Candidate (inestable)', `\`${getCmds('test').join('`, `')}\``)
                .setColor('RANDOM')
                .setThumbnail(client.user!.avatarURL()!)
                .setFooter('Necesitas ayuda con un comando? Prueba `help [comando]`', client.user!.avatarURL()!)

            return msg.channel.send({ embeds: [embed] });
        } else {
            // Información detallada de un comando
            
            // Obtener comando
            // TODO hacer que reconozca aliases
            let argCommand = client.commands.find((e: any) => command == e.name);
            if(argCommand == undefined) {
                msg.reply({
                    content: '😐**・No he encontrado ese comando**',
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            } else {
                // Embed
                const embed = new MessageEmbed()
                    .setTitle(`📚・Comando ${argCommand!.name}`)
                        .addField('Descripción', `${argCommand!.description}`)
                        .addField('Alias', `${argCommand!.aliases?.length == 0 ? 'Ninguno' : '`' + argCommand!.aliases?.join('`, `') + '`'}`, true)
                        .addField('Permisos', `${argCommand!.perms == undefined ? 'Ninguno' : '`' + argCommand!.perms + '`'}`, true)
                        .addField('NSFW', `${argCommand!.nsfw == true ? 'Sí' : 'No'}`, true)
                        .addField('Uso', `${argCommand!.usage}`, false)
                        .addField('Ejemplo(s)', `${'```\n' + argCommand!.example?.join('\n')+ '```'}`, false)
                        .addField('En desarrollo', `${argCommand!.indev == undefined ? 'No' : `Sí (${argCommand?.indev})`}`, false)
                        
                        .setColor('RANDOM')
                        .setThumbnail(client.user!.avatarURL()!)
                        .setFooter('Recuerda: los argumentos <> son obligatorios y los [] son opcionales', client.user!.avatarURL()!)
                
                return msg.channel.send({ embeds: [embed] });

            }
        }
	}
}
