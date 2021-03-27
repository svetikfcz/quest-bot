const { Bot, Keyboard, KeyboardColor } = require('node-vk-bot');
const util = require('util');

const steps = require('./steps');

const bot = new Bot({
    token: '5fa8926c6d522033605f9b36125d8d0146370c4f6d16fcb7c64a0905a4502ad6fb3a2b2bff5efa2a239ca',
    group_id: 203532199
}).start();

console.log('Bot started!');

bot.get(/./i, (message, exec, reply) => {
    let keyboard = new Keyboard(true);
    let info = message.payload && steps[JSON.parse(message.payload)] || steps[''];
    
    for (let i=0; i < info.btns.length; i++) {
        if (i) keyboard.addRow();

        const btn = info.btns[i];

        keyboard.addButton(btn.msg, KeyboardColor.PRIMARY, JSON.stringify(btn.next));
    }

    
    
    reply(info.question, {keyboard}).catch(e => console.error(e));
})

bot.on('poll-error', error => {
    console.error('error occurred on a working with the Long Poll server ' +
        `(${util.inspect(error, false, 8, true)})`)
})
