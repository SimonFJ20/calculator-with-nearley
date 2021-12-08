
@{%

const moo = require('moo');
const lexer = moo.compile({
    WS:         /[ \t]/,
    NL:         {match: /[;\n]/, lineBreaks: true},
    int:        /0|(?:[1-9][0-9]*)/,
    identifier: /[a-zA-Z\_\$]\w*/,
    pow:        '^',
    plus:       '+',
    minus:      '-',
    multiply:   '*',
    divide:     '/',
    lparen:     '(',
    rparen:     ')',
    comma:      ',',
});

%}

@lexer lexer

# program ->  AS %NL

expr    ->  subtract {% id %}

fcall   ->  identifier _ %lparen (_ value (_ %comma _ value):*):? _ %rparen 
{% (d) => execFunc(d[0], [d[3][1], ...d[3][2].map(d => d[3])]) %}

subtract->  add (_ %minus _ add):*              {% (d) => binOpValues(d).reduce((p, c, i) => i ? p - c : c) %}

add     ->  multiply (_ %plus _ multiply):*     {% (d) => binOpValues(d).reduce((p, c, i) => i ? p + c : c) %}

multiply->  divide (_ %multiply _ divide):*     {% (d) => binOpValues(d).reduce((p, c, i) => i ? p * c : c) %}

divide  ->  power (_ %divide _ power):*         {% (d) => binOpValues(d).reduce((p, c, i) => i ? p / c : c) %}

power   ->  value (_ %pow _ value):*            {% (d) => binOpValues(d).reduce((p, c, i) => i ? p ** c : c) %}

value   ->  %int    {% ([fst]) => parseInt(fst) %}
        |   %lparen _ expr _ %rparen  {% (d) => d[2] %}
        |   fcall

identifier  ->  %identifier {% ([{value}]) => value %}

__      ->  %WS:+
_       ->  %WS:*

@{%

const binOpValues = (d) => [d[0], ...d[1].map(a => a[3])];

const builtInFuncs = {
    "sqrt": (v) => Math.sqrt(v),
    "sum": (a, b) => a + b,
};

const execFunc = (name, args) => {
    const func = builtInFuncs[name];
    if (!func) throw new Error(`Function '${func}' not defined!`);
    return func(...args);
}



%}
