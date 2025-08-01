const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'commonjs',
		},
		rules: {
			semi: ['error', 'always'],
			'prefer-const': 'error',
		},
	},
	eslintPluginPrettierRecommended,
	{
		rules: eslintConfigPrettier.rules,
	},
];
