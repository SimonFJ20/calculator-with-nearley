
@{%

const moo = require('moo');
const lexer = moo.compile({
    WS:     /[ \t]/,
    NL:     {match: /[;\n]/, lineBreaks: true},
    int:    /0|(?:[1-9][0-9]*)/,
    pow:        '^',
    plus:       '+',
    minus:      '-',
    multiply:   '*',
    divide:     '/',
    lparen:     '(',
    rparen:     ')',
});

%}

@lexer lexer

# program ->  AS %NL

expr    ->  subtract #{% id %}

subtract->  add (_ %minus _ add):* #{% ([a]) => a %}

add     ->  multiply (_ %plus _ multiply):*  #{% ([a]) => a %}

multiply->  divide (_ %multiply _ divide):*  #{% ([a]) => a %}

divide  ->  power (_ %divide _ power):*  #{% ([a]) => a %}

power   ->  value (_ %pow _ value):*  {% (d) => [d[0], ...d[1].map(a=>[...a])] %}

value   ->  %int    {% ([fst]) => parseInt(fst) %}
        |   %lparen _ expr _ %rparen  #{% ([,,v]) => v %}

__      ->  %WS:+
_       ->  %WS:*
