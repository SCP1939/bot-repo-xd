/* Events types */

// Libs
import { ClientEvents, Interaction, Message, Guild } from 'discord.js';
import extClient from '../client';

// Types
// Este tipo solo es una función. Está incrustado enel tipo Event
type Run = (
	client: extClient, 
	msg: Message
	) => {}

// Este tipo se exportará
export type Event = {
	name: keyof ClientEvents,
	run: Run
}