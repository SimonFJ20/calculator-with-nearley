const nearley = require('nearley');
const grammar = require('./grammar');
const prompt = require('prompt-sync')();

const input = (prefix) => {
    return new Promise((resolve, reject) => {
        const text = prompt(prefix);
        if (typeof text !== 'string')
            reject(new Error('canceled'));
        else
            resolve(text);
    })
}

const main = async () => {

    while (true) {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        const text = await input('crackulator → ');        
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
