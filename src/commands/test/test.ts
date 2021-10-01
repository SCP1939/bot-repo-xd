import { broadcastArgs } from '@tensorflow/tfjs-core';
import { Message, MessageMentions } from 'discord.js';
import extClient from '../../client';
import { warn } from '../../db/model/warn';
import { Command } from '../../types';



export const command: Command = {
	name: 'test',
	description: 'temaso',
	
	aliases: ['t'],
	disabled: false,
	
    guildOnly: false,
    dev: true,
	indev: 'Release Candidate',

	usage: '<usuario> <motivo>',
	example: ['@usuario publicar contenido inapropiado', '@usuario xd'],
	args: {
		required: 1,
		requiredMention: true
	},
	
	run: async (client: extClient, msg: Message, args: string[]) => {
		const mention = msg.mentions.members?.first();
		const reason = args.slice(1).join(' ');
		
		msg.channel.send(`${mention}, ${reason}`);
	}
}



/* Prueba de tensorflow (toxicidad)

//require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs');
import {load} from '@tensorflow-models/toxicity';
let t1 = new Date();
msg.channel.send('El proceso ha comenzado')
const threshold = 0.9;


load(threshold, ['identity_attack', 'insult', 'obscene', 'severe_toxicity', 'sexual_explicit', 'threat', 'toxicity']).then(model => {
	msg.channel.send('El proceso continua...')
	const sentences = args;
	model.classify(sentences).then(predictions => {
		let t2 = new Date();

		//@ts-ignore
		console.log(predictions.results)
		return msg.channel.send(`
		**Predicciones de tensorflow:**
		\`\`\`json
		${ // @ts-ignore
			predictions.results}
		\`\`\`
		Tiempo de vida perdido: **${//@ts-ignore
			t2 - t1} ms.**
		`)
	})
})*/