/* Command Types */

// Libs
import { Message } from 'discord.js';
import extClient from '../client';

// Types
// Este tipo solo es una función. Está incrustado en el tipo Command
type Run = (client: extClient, msg: Message, args: string[]) => {}

// Solo éste tipo se exportará
export type Command = {
	// Requerido
	name: string,
	description: string,

	// Opcionales
	aliases?: string[],
	disabled?: boolean,

	// Inhibidores
	guildOnly?: boolean,
	nsfw?: boolean,

	// Permisos
	dev?: boolean,
	perms?: 'ban'|
	'kick'|
	'admin'|
	'manageChannels'|
	'manageMessages'|
	'manageEmojis'|
	'manageAKA',
	
	// Argumentos
	usage?: string,
	example?: string[],
	args?: {
		required?: number,
		requiredMention?: boolean
	},
	
	// Flags? nose como llamarlo xd
	indev?: boolean,


	// Run
	run: Run
}

// Posibles ideas para un futuro
/*

cooldown?: number,
*/