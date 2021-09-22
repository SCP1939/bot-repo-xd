/* Command Types */

// Libs
import { Interaction, Message } from 'discord.js';
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

	// Argumentos
	args?: boolean,
	usage?: string,

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

	// Run
	run: Run
}

// Posibles ideas para un futuro
/*
cooldown?: number,
*/