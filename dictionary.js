'use strict';
export const groups = {
	language : 'language',
	frontend : 'frontend',
	backend : 'backend',
	build : 'build',
	testing : 'testing',
	tools : 'hardware'
};

export const skills = {
	javascript : {
		group : groups.language,
		name : 'Javascript'
	},
	elixir : {
		group : groups.language,
		name : 'Elixir'
	},
	angular : {
		group : groups.frontend,
		name : 'Angular'
	},
	jquery : {
		group : groups.frontend,
		name : 'JQuery'
	},
	canvas : {
		group : groups.frontend,
		name : 'Html5 Canvas'
	},
	node : {
		group : groups.backend,
		name : 'Node'
	},
	express : {
		group : groups.backend,
		name : 'Express'
	},
	mongo : {
		group : groups.backend,
		name : 'MongoDB'
	},
	mongoose : {
		group : groups.backend,
		name : 'Mongoose'
	},
	firebase : {
		group : groups.backend,
		name : 'Firebase'
	},
	jasmine : {
		group : groups.testing,
		name : 'Jasmine'
	},
	karma : {
		group : groups.testing,
		name : 'Karma'
	},
	mocha : {
		group : groups.testing,
		name : 'Mocha'
	},
	sinon : {
		group : groups.testing,
		name : 'Sinon'
	},
	gulp : {
		group : groups.build,
		name : 'Gulp'
	},
	sass : {
		group : groups.build,
		name : 'Sass'
	},
	grunt : {
		group : groups.build,
		name : 'Grunt'
	},
	webpack : {
		group : groups.build,
		name : 'Webpack'
	},
	ionic : {
		group : groups.frontend,
		name : 'Ionic'
	},
	extension : {
		group : groups.frontend,
		name : 'Chrome Extension'
	},
	socket : {
		group : groups.frontend,
		name : 'Socket.Io'
	},
	tessel : {
		group : groups.tools,
		name : 'Tessel'
	},
	cheerio : {
		group : groups.tools,
		name : "Cheerio"
	},
	tone : {
		group : groups.tools,
		name : "ToneJs"
	},
	googlemaps : {
		group : groups.frontend,
		name : "Google Maps"
	},
	arduino : {
		group : groups.tools,
		name : "Arduino/Johnny-Five"
	},
	d3 : {
		group : groups.frontend,
		name : "D3"
	},
	electron : {
		group : groups.frontend,
		name : "Electron"
	},
	react : {
		group: groups.frontend,
		name : "React"
	},
	redux : {
		group: groups.frontend,
		name : "Redux"
	},
	docker : {
		group : groups.backend,
		name : "Docker"
	},
	"react native" : {
		group : groups.frontend,
		name : "React Native"
	},
	artik : {
		group : groups.tools,
		name : "Samsung Artik"
	},
	chai : {
		group : groups.testing,
		name : "Chai"
	},
	less : {
		group : groups.build,
		name : "Less"
	},
	linux : {
		group : groups.backend,
		name : "Linux"
	}
};