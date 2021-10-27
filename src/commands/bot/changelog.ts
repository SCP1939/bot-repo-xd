import { Message, MessageEmbed } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

export const command: Command = {
	name: 'changelog',
	description: 'Muestra los cambios del bot en cada versión',
	usage: '[versión]',
	example: ['', '0.1a', 'v.2.1'],
    indev: 'Alfa',

	run: async (client: extClient, msg: Message, args: string[]) => {

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
                patches: ['20aC001']
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
                .setColor('DARK_BLUE')
                .setThumbnail(client.user!.avatarURL()!)
                .setFooter('Normal changelogs', client.user!.avatarURL()!)

            return msg.channel.send({ embeds: [embed] });

        } else {

            let v = changelog.find((e: any) => version == e.version);

            if(v == undefined) {
                msg.channel.send({
                    content: '😐**・No he encontrado esea versión**'
                });

            } else {
                // Embed
                const embed = new MessageEmbed()
                .setTitle('📝・Changelog')
                .addField('Versión:', `${v.version}`, true)
                .addField('Fecha de lanzamiento:', `\`${v.release}\``, true)
                .addField('Parches:', `${v.patches.length == 0 ? 'Ninguno': '`' + v.patches.map((e: any) => e).join('`, `') + '`'}`, true)
                .addField('Cambios:', `\`\`\`\n${v.changes}\`\`\``, false)
                .setColor('DARK_BLUE')
                .setThumbnail(client.user!.avatarURL()!)
                .setFooter('Normal changelogs', client.user!.avatarURL()!)
                
                return msg.channel.send({ embeds: [embed] });

            }
        }
    }
}