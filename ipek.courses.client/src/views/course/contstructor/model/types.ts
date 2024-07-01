import { type Delta } from 'quill/core';
const langs = [
	'plaintext',
	'1c',
	'abnf',
	'accesslog',
	'actionscript',
	'ada',
	'angelscript',
	'apache',
	'applescript',
	'arcade',
	'arduino',
	'armasm',
	'asciidoc',
	'aspectj',
	'autohotkey',
	'autoit',
	'avrasm',
	'awk',
	'axapta',
	'bash',
	'basic',
	'bnf',
	'brainfuck',
	'c',
	'cal',
	'capnproto',
	'ceylon',
	'clean',
	'clojure',
	'clojure-repl',
	'cmake',
	'coffeescript',
	'coq',
	'cos',
	'cpp',
	'crmsh',
	'crystal',
	'csharp',
	'csp',
	'css',
	'd',
	'dart',
	'delphi',
	'diff',
	'django',
	'dns',
	'dockerfile',
	'dos',
	'dsconfig',
	'dts',
	'dust',
	'ebnf',
	'elixir',
	'elm',
	'erb',
	'erlang',
	'erlang-repl',
	'excel',
	'fix',
	'flix',
	'fortran',
	'fsharp',
	'gams',
	'gauss',
	'gcode',
	'gherkin',
	'glsl',
	'gml',
	'go',
	'golo',
	'gradle',
	'graphql',
	'groovy',
	'haml',
	'handlebars',
	'haskell',
	'haxe',
	'hsp',
	'http',
	'hy',
	'inform7',
	'ini',
	'irpf90',
	'isbl',
	'java',
	'javascript',
	'jboss-cli',
	'json',
	'julia',
	'julia-repl',
	'kotlin',
	'lasso',
	'latex',
	'ldif',
	'leaf',
	'less',
	'lisp',
	'livecodeserver',
	'livescript',
	'llvm',
	'lsl',
	'lua',
	'makefile',
	'markdown',
	'mathematica',
	'matlab',
	'maxima',
	'mel',
	'mercury',
	'mipsasm',
	'mizar',
	'mojolicious',
	'monkey',
	'moonscript',
	'n1ql',
	'nestedtext',
	'nginx',
	'nim',
	'nix',
	'node-repl',
	'nsis',
	'objectivec',
	'ocaml',
	'openscad',
	'oxygene',
	'parser3',
	'perl',
	'pf',
	'pgsql',
	'php',
	'php-template',
	'pony',
	'powershell',
	'processing',
	'profile',
	'prolog',
	'properties',
	'protobuf',
	'puppet',
	'purebasic',
	'python',
	'python-repl',
	'q',
	'qml',
	'r',
	'reasonml',
	'rib',
	'roboconf',
	'routeros',
	'rsl',
	'ruby',
	'ruleslanguage',
	'rust',
	'sas',
	'scala',
	'scheme',
	'scilab',
	'scss',
	'shell',
	'smali',
	'smalltalk',
	'sml',
	'sqf',
	'sql',
	'stan',
	'stata',
	'step21',
	'stylus',
	'subunit',
	'swift',
	'taggerscript',
	'tap',
	'tcl',
	'thrift',
	'tp',
	'twig',
	'typescript',
	'vala',
	'vbnet',
	'vbscript',
	'vbscript-html',
	'verilog',
	'vhdl',
	'vim',
	'wasm',
	'wren',
	'x86asm',
	'xl',
	'xml',
	'xquery',
	'yaml',
	'zephir',
] as const;
export type TLanguages = (typeof langs)[number];

export type TConstructor = 'code' | 'theory' | 'test';
export interface IConstructorQuestions {
	quest: string;
	code: string;
	lang: TLanguages;
}

export interface IConstructorCode {
	theory?: Delta;
	question?: IConstructorQuestions;
	isReadonly: boolean;
}

export interface IConstructorTheory {
	isReadonly: boolean;
	content?: Delta;
}

export type TAnswers = [string, string, string, string];

export type TTrueAnswers = [number?, number?, number?, number?];

export interface IAnswer {
	id: number;
	title: string;
	answers: TAnswers;
	trueAnswer: TTrueAnswers | number | null;
}

export interface IConstructorTest {
	isReadonly: boolean;
	content?: IAnswer[];
}

export interface IConstructorData {
	code: IConstructorCode;
	theory: IConstructorTheory;
	test: IConstructorTest;
}

export interface IConstructorHeader {
	isReadonly: boolean;
	title?: string;
	time?: string;
}

export interface IConstructor {
	type: TConstructor;
}
