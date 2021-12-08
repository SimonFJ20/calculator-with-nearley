
grammar: grammar.ne
	nearleyc $< -o grammar.js
	nearley-railroad $< -o grammar.html
