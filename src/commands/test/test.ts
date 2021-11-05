import { broadcastArgs } from '@tensorflow/tfjs-core';
import { Message, MessageMentions } from 'discord.js';
import extClient from '../../client';
import { warn } from '../../db/model/warn';
import { Command } from '../../types';
import { msgDone, msgError, msgInfo, msgWarn } from '../../util/msgs';



export const command: Command = {
	name: 'test',
	description: 'temaso',
	aliases: ['t'],

    dev: true,
	indev: 'Release Candidate',

	usage: '<usuario> <motivo>',
	example: ['@usuario publicar contenido inapropiado', '@usuario xd'],
	args: 1,
	
	run: async (client: extClient, msg: Message, args: string[]) => {
		/*try {
			const crud = args[1];
			const data = args.slice(2).join(' ');	

			if (crud == 'c') {
					if (data.length > 0) {
						const newData = new warn({
							reason: data
						});
		
						const savedData = newData.save();
		
						return msg.channel.send(`CRUD: \`create\`\nDato: \`${(await savedData).reason}\``);
					} else {
						return msg.channel.send('Escribe un dato')
					}
			} 
			if (crud == 'r') {
					if (data.length > 0) {
						const getData = await warn.findOne({reason: data});

						return msg.channel.send(`CRUD: \`findOne\`\nDato: \`${getData?.reason}\``);
					} else {
						const getData = await warn.find();
						// @ts-ignore
						return msg.channel.send(`CRUD: \`find\`\nDato: \`${getData?.reason}\``);
					}
			} 
			if (crud == 'u') {
					if (data .length > 0) {
						const getData = await warn.findOneAndUpdate({
							reason: data
						})
						return msg.channel.send(`CRUD: \`update\`\nDato: \`${getData?.reason}\``);
					} else {
						return msg.channel.send('Escribe un dato')
					}
				} 
				if (crud == 'd') {
					if (data !== undefined) {
						const deleteData = await warn.findOneAndDelete({
							reason: data
						});

						return msg.channel.send(`CRUD: \`delete\`\nDato: \`${deleteData}\``);
					} else {
						return msg.channel.send('Escribe un dato')
					}
				} else {
					return msg.channel.send('Escribe un parámetro de CRUD válido (c, r, u, d)')
				}
			
		} catch (error) {
			msg.channel.send(`Ha habido un error\n\`\`\`\n${error}\n\`\`\``)
		}*/
		msgError('Esto es un error', msg, client);
		msgWarn('Esto es una advertencia', msg, client);
		msgInfo('Esto es una info', msg, client);
		msgDone('Esto es un done', msg, client);
		return msg.channel.send(args[0].startsWith('<@') ? 'Mention' : 'No mention');
	}
}

/* Prueba de argumentos

const mention = msg.mentions.members?.first();
const reason = args.slice(1).join(' ');

msg.channel.send(`${mention}, ${reason}`);
*/

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