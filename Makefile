
grammar: grammar.ne
	nearleyc $< -o grammar.js

railroad: grammar.ne
	nearley-railroad $< -o grammar.html
