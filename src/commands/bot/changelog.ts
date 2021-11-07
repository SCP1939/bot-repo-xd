import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import extClient from '../../client';

import { color as c } from '../../botconfig';
import { msgCritical, msgError } from '../../util/msgs';

export const command: Command = {
	name: 'changelog',
	description: 'Muestra los cambios del bot en cada versión',
	usage: '[versión]',
	example: ['', '2.0a'],
    indev: 'Alfa',

	run: async (client: extClient, msg: Message, args: string[]) => {
        try {
		
            /*
                Formato del changelog:
                La posición 0 será para la última versión
                versión (sin "v."): versión mayor.versión menor (letra "a" si es alfa)
                release (fecha de lanzamiento): dia/mes/año
                changes (cambios): texto
                patches (parches que ha tenido): Versión mayorVersión menorCambio001
                ("C" comandos, "E", eventos, "D" base de datos y "B" cosas internas del bot)
    
    
                Plantilla de cambios:
                Se ha hecho esto y esto otro asdasdasdasdasd
    
                Características:
                - No se motivo 1
                - 
                - 
                
                Nueva lista:
                - 
                
                Futuros planes:
                - 
    
                Agradecimientos:
                - 
                
        */
            const changelog: {
                version: string,
                release: string,
                changes: string,
                patches: string[]
            }[] = [
                {
                    version: '2.0a',
                    release: '01/10/2021',
                    // Uso un array y un join porque si no me queda sucio el código
                    changes: [
                        'Después de un abandono del proyecto por motivos personales y el hackeo de mi cuenta, tras meditarlo durante un tiempo, he decidido reprogramar todo el bot desde cero para crear un bot más seguro, útil y entretenido.',
                        ' ',
                        'Características:',
                        '- Escrito en TypeScript',
                        '- Uso de Discord.JS 13',
                        '- Mejor mantenimiento',
                        '- Comandos variados y funcionales',
                        '- Y más...',
                        ' ',
                        'Agradecimientos:',
                        '- Gracias a Bryanandnothingelse y SCP por la motivación y la ayuda en el desarrollo 😄'
                    ].join('\n')
                ,
                    patches: ['20aC001', '20aB002']
                }
            ];
    
            const version = args[0];
            if (version == undefined) {
    
                // Embed
                const embed = new MessageEmbed()
                    .setTitle('📝・Changelogs')
                    .setDescription('Este es el listado de versiones del desarrollo del bot.\nSi deseas ver los detalles de una versión en concreto, escribe `changelog [versión]`')
                    .addField(`Última versión: (${changelog[0].version})`, `Fecha de lanzamiento: \`${changelog[0].release}\``)
                    // Añadir más fields a medida que hay más versiones
                    /*.addField(`${changelog[1].version}`, `\`\``)
                    .addField(`${changelog[2].version}`, `\`\``)
                    .addField(`${changelog[3].version}`, `\`\``)
                    .addField(`${changelog[4].version}`, `\`\``)
                    .addField(`${changelog[5].version}`, `\`\``)*/
                    .addField(`Todas las versiones:`, `\`${changelog.map((e: any) => e.version).join('`, `')}\``)
                    .setColor(c.default)
                    .setThumbnail(client.user!.avatarURL()!)
                    .setFooter('Normal changelogs', client.user!.avatarURL()!)
    
                return msg.channel.send({ embeds: [embed] });
    
            } else {
    
                let v = changelog.find((e: any) => version == e.version);
    
                if(v == undefined) {
                    msgError( // carta reverse
                        'No he encontrado esa versión', msg, client
                    );
                    // carta blooqueo
                    // we're no strangers to love 
                    // you know the rules and so do I 
                    // a full commitment's what I'm thinking of 
                    // you wouldn't get this from any other guy 
                    // I just wanna tell you how I'm feeling 
                    // Gotta make you understand 

                    // Never gonna give you up 
                    // Never gonna let you down 
                    // Never gonna run around and desert you 
                    // Never gonna make you cry 
                    // Never gonna say goodbye 
                    // Never gonna tell a lie and hurt you
                    
                } else {
                    // Embed
                    const embed = new MessageEmbed()
                    .setTitle('📝・Changelog')
                    .addField('Versión:', `${v.version}`, true)
                    .addField('Fecha de lanzamiento:', `\`${v.release}\``, true)
                    .addField('Parches:', `${v.patches.length == 0 ? 'Ninguno': '`' + v.patches.map((e: any) => e).join('`, `') + '`'}`, true)
                    .addField('Cambios:', `\`\`\`\n${v.changes}\`\`\``, false)
                    .setColor(c.default)
                    .setThumbnail(client.user!.avatarURL()!)
                    .setFooter('Normal changelogs', client.user!.avatarURL()!)
                    
                    return msg.channel.send({ embeds: [embed] });
    
                }
            }
		} catch (err) {
			return msgCritical(err, msg, client);
		}
    }       
}