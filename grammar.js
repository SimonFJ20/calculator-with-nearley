// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const moo = require('moo');
    const lexer = moo.compile({
        WS:         /[ \t]/,
        NL:         {match: /[;\n]/, lineBreaks: true},
        float:      /(?:0|(?:[1-9][0-9]*))\.\d+/,
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


    const binOpValues = (d) => [d[0], ...d[1].map(a => a[3])];

    const builtInFuncs = {
        "exit": () => process.exit(0),
        "sqrt": (v) => Math.sqrt(v),
        "sum": (a, b) => a + b,
    };

    const execFunc = (name, args) => {
        const func = builtInFuncs[name];
        if (!func) throw new Error(`Function '${func}' not defined!`);
        return func(...args);
    }
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "expr", "symbols": ["subtract"], "postprocess": id},
    {"name": "fcall$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "fcall$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "expr"]},
    {"name": "fcall$ebnf$1$subexpression$1$ebnf$1", "symbols": ["fcall$ebnf$1$subexpression$1$ebnf$1", "fcall$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "fcall$ebnf$1$subexpression$1", "symbols": ["_", "expr", "fcall$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "fcall$ebnf$1", "symbols": ["fcall$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "fcall$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fcall", "symbols": ["identifier", "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "fcall$ebnf$1", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": (d) => execFunc(d[0], d[3] ? [d[3][1], ...d[3][2]?.map(d => d[3])] : [])},
    {"name": "subtract$ebnf$1", "symbols": []},
    {"name": "subtract$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("minus") ? {type: "minus"} : minus), "_", "add"]},
    {"name": "subtract$ebnf$1", "symbols": ["subtract$ebnf$1", "subtract$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "subtract", "symbols": ["add", "subtract$ebnf$1"], "postprocess": (d) => binOpValues(d).reduce((p, c, i) => i ? p - c : c)},
    {"name": "add$ebnf$1", "symbols": []},
    {"name": "add$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("plus") ? {type: "plus"} : plus), "_", "multiply"]},
    {"name": "add$ebnf$1", "symbols": ["add$ebnf$1", "add$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "add", "symbols": ["multiply", "add$ebnf$1"], "postprocess": (d) => binOpValues(d).reduce((p, c, i) => i ? p + c : c)},
    {"name": "multiply$ebnf$1", "symbols": []},
    {"name": "multiply$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("multiply") ? {type: "multiply"} : multiply), "_", "divide"]},
    {"name": "multiply$ebnf$1", "symbols": ["multiply$ebnf$1", "multiply$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "multiply", "symbols": ["divide", "multiply$ebnf$1"], "postprocess": (d) => binOpValues(d).reduce((p, c, i) => i ? p * c : c)},
    {"name": "divide$ebnf$1", "symbols": []},
    {"name": "divide$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("divide") ? {type: "divide"} : divide), "_", "power"]},
    {"name": "divide$ebnf$1", "symbols": ["divide$ebnf$1", "divide$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "divide", "symbols": ["power", "divide$ebnf$1"], "postprocess": (d) => binOpValues(d).reduce((p, c, i) => i ? p / c : c)},
    {"name": "power$ebnf$1", "symbols": []},
    {"name": "power$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("pow") ? {type: "pow"} : pow), "_", "unary"]},
    {"name": "power$ebnf$1", "symbols": ["power$ebnf$1", "power$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "power", "symbols": ["unary", "power$ebnf$1"], "postprocess": (d) => binOpValues(d).reduce((p, c, i) => i ? p ** c : c)},
    {"name": "unary$ebnf$1$subexpression$1", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus), "_"]},
    {"name": "unary$ebnf$1", "symbols": ["unary$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "unary$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unary", "symbols": ["unary$ebnf$1", "value"], "postprocess": ([fst, snd]) => fst ? snd * -1 : snd},
    {"name": "value", "symbols": ["float"], "postprocess": id},
    {"name": "value", "symbols": ["int"], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expr", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": (d) => d[2]},
    {"name": "value", "symbols": ["fcall"], "postprocess": id},
    {"name": "float", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": ([fst]) => parseFloat(fst)},
    {"name": "int", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": ([fst]) => parseInt(fst)},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([{value}]) => value},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "expr"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
