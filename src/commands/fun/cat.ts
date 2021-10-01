import { Message, MessageEmbed } from 'discord.js';
import extClient from '../../client';
import { Command } from '../../types';

import Cataas from 'cataas-api';
import axios from 'axios';
const cataas = new Cataas();

export const command: Command = {
	name: 'cat',
	description: 'Muestra un gatito guapísimo',
    aliases: ['kitty', 'cats', 'meow'],
	usage: '',
	example: [''],

    indev: 'Release Candidate',

	run: async (client: extClient, msg: Message, args: string[]) => {
        try {

            // El embed tarda en enviarse
            const embed = new MessageEmbed()
            .setTitle('🐱 Miau?')
            .setFooter('Cargando...')
            .setColor('ORANGE')
            
            const message = await msg.channel.send({ embeds: [embed] });
            
            const newEmbed = message.embeds[0];


            // Sin dudarlo la mejor API (excepto por el ping)
            const res = await axios.get('https://cataas.com/cat?json=true');

            newEmbed
            .setTitle('😻 Aquí tienes un gatito guapísimo')
            .setImage('https://cataas.com' + res.data.url)
                .setColor('ORANGE')
                .setFooter('(disculpen el retraso) Hecho con cataas.com')

            message.react('❤️');
            
            return message.edit({embeds: [newEmbed]});
        } catch (err) {
            return msg.channel.send('🤔**・Hmmm, parece que algo no salió bien. Vuelve a intentarlo!**')
        }
    }
}