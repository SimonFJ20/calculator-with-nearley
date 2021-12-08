const nearley = require('nearley');
const grammar = require('./grammar');
const prompt = require('prompt-async');


const main = async () => {

    prompt.start();
    prompt.message = '';
    prompt.delimiter = '→';

    while (true) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        const {question: text} = await prompt.get({message: 'crackulator'});
        parser.feed(text);
        console.log(parser.results[0]);
    }

}

main().catch((error) => {
    if (error.message === 'canceled') {
        console.log('');
        process.exit(0);
    } else throw error;
});
