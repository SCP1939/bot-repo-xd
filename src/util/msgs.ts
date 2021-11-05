import { Message, MessageSelectMenu, MessageEmbed } from 'discord.js';
import extClient from '../client';
const { version } = require('../../package.json');

let message: Message;
let extclient: extClient;
/*
    Emojis:
    warn: <:Nwarn:906291449228820480>
    - y +: <:Nmenos:906291293368508428> <:Nmas:906291031581003838> 
    Info: <:Ninfo:906291652488990820>
    Error: <:Nerror:906291571522142309>
    Correcto: <:Ncorrecto:906290866308661278>
*/
/*const selectMenu = new MessageSelectMenu().addOptions([
    {
        //@ts-ignore
        name: '❌', // a f k
        value: '❌ o k',
        description: 'Close',
        emoji: '❌'
    }
]); // esto de los botones tengo que probarlo*/

// error
export function msgError(content: string, msg: Message, client: extClient) {
	const embed = new MessageEmbed()
		.setTitle(`<:Nerror:906291571522142309>・Error`)
		.setDescription(content)
		.setColor('#ef5350')
		.setFooter(
			`Normal ${version}`,
			client.user!.avatarURL()!
		);
	return msg.reply({ embeds: [embed] });
}

// error Emoji
export function msgErrorEmoji(content: string, emoji: string, msg: Message, client: extClient) {
	const embed = new MessageEmbed()
		.setTitle(`${emoji}・Error`)
		.setDescription(content)
		.setColor('#ef5350')
		.setFooter(
			`Normal ${version}`,
			client.user!.avatarURL()!
		);
	return msg.reply({ embeds: [embed] });
}



// Advertencia
export function msgWarn(content: string, msg: Message, client: extClient) {
	const embed = new MessageEmbed()
		.setTitle(`<:Nwarn:906291449228820480>・Advertencia`)
		.setDescription(content)
		.setColor('#ffc107')
		.setFooter(
			`Normal ${version}`,
			client.user!.avatarURL()!
		);
	return msg.reply({ embeds: [embed] });
}

// Info
export function msgInfo(content: string, msg: Message, client: extClient) {
	const embed = new MessageEmbed()
		.setTitle(`<:Ninfo:906291652488990820>・Info`)
		.setDescription(content)
		.setColor('#2196f3')
		.setFooter(
			`Normal ${version}`,
			client.user!.avatarURL()!
		);
	return msg.reply({ embeds: [embed] });
}

// Correcto 
export function msgDone(content: string, msg: Message, client: extClient) {
	const embed = new MessageEmbed()
		.setTitle(`<:Ncorrecto:906290866308661278>・Hecho`)
		.setDescription(content)
		.setColor('#2dcca2')
		.setFooter(
			`Normal ${version}`,
			client.user!.avatarURL()!
		);
	return msg.reply({ embeds: [embed] });
}

