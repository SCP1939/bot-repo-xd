import { Event, Command } from '../types';
import { Message, MessageMentions, MessagePayload, Permissions } from 'discord.js';
import { config } from '../botconfig';


export const event: Event = {
    name: 'messageCreate',
    run: async (client: any, msg: Message) => {
        // Prevenir bots, webhooks o cualquier mensaje que no tenga el prefix
        if (msg.author.bot || msg.webhookId || !msg.content.startsWith(config.prefix)) return;

        // Definir argumentos y eso
        const args = msg.content.slice(config.prefix.length).trim().split(/ +/g); // Dividir argumentos
        const cmd = args.shift()?.toLowerCase(); // Obtener comando
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        const data = client.commands.get(cmd); // Obtener datos del comando
        
        
        // TODO poner embeds en los mensajes?
        
        
        if (!command) { return }
        
        msg.channel.send(`Permiso del comando: ${data.perms} | Desarrollador: ${msg.author.id == config.dev} | Dueño del server: ${msg.author.id == msg.guild!.ownerId}`)

        // if if if if if if if if if if if if 
        if (data.dev && msg.author.id !== config.dev) {
            return msg.reply('🤖 **| No eres mi desarrollador**')
        }

        if (data.disabled) {
            return msg.reply('🛌 **| Este comando está desactivado**')
        }

        if ((data.guildOnly || typeof data.guildOnly !== 'boolean') && msg.channel.type == 'DM') {
            return msg.reply('🌎 **| Este comando está dedicado para servers**')
        }

        // @ts-ignore
        if (data.nsfw && !msg.channel.nsfw) {
            return msg.reply('🔥 **| Este comando solo puede ejecutarse en canales NSFW**')
        }

        if(
            (msg.author.id !== config.dev) || // Un capricho mio xd
            (msg.guild!.ownerId !== msg.author.id) ||
            (!msg.member?.permissions.has('ADMINISTRATOR'))
        ){
            if(
                (data.perms == 'ban' && msg.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) ||
                (data.perms == 'kick' && msg.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) ||
                (data.perms == 'admin' && msg.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) ||
                (data.perms == 'manageRoles' && msg.member?.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) ||
                (data.perms == 'manageMessages' && msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) ||
                (data.perms == 'manageEmojis' && msg.member?.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) ||
                (data.perms == 'manageAKA' && msg.member?.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME))
            ){

                return msg.reply(`😐 **| Te falta el permiso** \`${data.perms}\` **para poder ejecutar el comando**`)
            }
        }
        /*if () {

        }*/
        // Ejecución de comandos
        if (command) {
            (command as Command).run(client, msg, args);
        }
    }
}