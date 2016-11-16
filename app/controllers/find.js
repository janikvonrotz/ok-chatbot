import I18n from '../I18n';
import pokemon from 'pokemon';
import { createButtons, getUser } from '../templates';
import { Users } from '../connectors';

export default (bot, message) => {

    let getUserPromise = getUser(message.user);
    getUserPromise.then((user) => {

        let pokeMax = 151;
        let foundPokes = user.foundPokes;
        let pokeId = (Math.floor(Math.random() * pokeMax) + 1);
        let pokeName = pokemon.getName(pokeId);
        let pokeNameDe = pokemon.getName(pokeId, 'de');
        let pokeImage = {
            "attachment": {
                "type":"image",
                "payload":{
                    "url": `https://img.pokemondb.net/artwork/${pokeName.toLowerCase()}.jpg`
                }
            }
        };

        let phrases = I18n('ctrl_pokemon.catched');
        let text = phrases[Math.floor(Math.random() * phrases.length)];

        // check if pokemon has been catched.
        if(foundPokes.indexOf(pokeId) > -1){
            text = I18n('ctrl_pokemon.already_catched');
        }else{
            foundPokes.push(pokeId);
            Users.update({_id: user.id}, { $set: { foundPokes: foundPokes}}, (error, response) => {
                if(error) {
                    console.log(error);
                    bot.reply(message, I18n('message_error'));
                }
            });
        }

        text = text.replace('{pokeName}', pokeNameDe);
        let text2 = I18n('ctrl_pokemon.amount_catched').replace('{pokeSum}', foundPokes.length).replace('{pokeMax}', pokeMax);
        if(foundPokes.length == pokeMax){
          text2 = I18n('ctrl_pokemon.all_catched')
        }
        let text3 = I18n('ctrl_pokemon.find_another');
        let buttons = [{
            title: I18n('button_repeat'),
            payload: 'find_poke'
        }];

        bot.startConversation(message, (error, convo) => {
            convo.say(pokeImage);
            convo.say(text);
            convo.say(text2);
            convo.say(createButtons(text3, buttons));
        });
    });
    getUserPromise.catch((error) => {
        console.log(error);
        bot.reply(message, I18n('message_error'));
    });
};
