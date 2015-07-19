'use strict'
var $ = require('jquery');
var groups = {
	language : 'language',
	frontend : 'frontend',
	backend : 'backend',
	build : 'build',
	testing : 'testing',
	tools : 'tools'
};

var skillsIndex = {
	javascript : {
		group : groups.language,
		name : 'Javascript'
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
		name : 'Node/Express'
	},
	mongo : {
		group : groups.backend,
		name : 'MongoDB/Mongoose'
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
	gulp : {
		group : groups.build,
		name : 'Mocha'
	},
	sass : {
		group : groups.build,
		name : 'Sass'
	},
	grunt : {
		group : groups.build,
		name : 'Grunt'
	},
	ionic : {
		group : groups.tools,
		name : 'Ionic'
	},
	extension : {
		group : groups.tools,
		name : 'Chrome Extension'
	},
	socket : {
		group : groups.tools,
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
	}
};

$(document).ready(function(){
	$.getJSON('data.json', function(data){
		console.log(data);
		var profile = new Layout(data);
		profile.render();
	});
});

class Layout {
	constructor(data){
		//actual variables
		this._info;
		this._contact;
		this._skills;
		this._projects;

		//interface variables
		this.info = data.info;
		this.contact = data.contact;
		this.skills = data.skills;
		this.projects = data.projects;
	}
	get info() {
		return this._info;
	}
	set info(info){
		this._info = info;
	}
	get contact(){
		return this._contact;
	}
	set contact(contact){
		this._contact = contact;
	}
	get skills(){
		return this._skills;
	}
	set skills(skills){
		skills = Object.keys(groups).map(function(type){
				var info = {
					name : groups[type],
				};
				info.list = skills.filter(function(skill){
					return skillsIndex[skill.name].group === groups[type];
				}).map(function(skill){
					var details = skillsIndex[skill.name];
					details.rating = skill.rating;
					return details;
				});
			return info;
		});
		this._skills = skills;
	}
	get projects(){
		return this._projects;
	}
	set projects(projects){
		projects = projects.map(function(project){
			project.tech = project.tech.map(function(tag){
				return skillsIndex[tag];
			});
			return project;
		});
		this._projects = projects;
	}
	render(){
		var body = document.body;
		var infoContainer = $('#info');
		var contactsContainer = $('#contact');
		var skillsContainer = $('#skills');
		var projectsContainer = $('#projects');
		buildInfo(infoContainer, this.info);
		buildContact(contactsContainer, this.contact);
		buildSkills(skillsContainer, this.skills);
		buildProjects(projectsContainer, this.projects);
	}
}

function buildInfo (node, info){
	var name = $(document.createElement('h2')).text(info.name);
	var description = $(document.createElement('p')).text(info.description);
	node.append(name);
	node.append(description);
	$('#image').css('background', 'url(' + info.image +') center/cover');
}

function buildContact(node, contact){
	var icons = {
		github : 'fa fa-github-alt',
		linkedin : 'fa fa-linkedin',
		email : 'fa fa-envelope',
		phone : 'fa fa-phone'
	};

	Object.keys(contact).forEach(function(type){
		var link = $(document.createElement('a'));
		var represent = $(document.createElement('i')).addClass(icons[type]);
		var text = $(document.createElement('span')).text(type.toUpperCase());
		if(type === 'email'){
			link.attr('href', 'mailto:' + contact[type]);
		} else if(type === 'phone'){
			link.attr('href', 'tel:' + contact[type]);
		} else {
			link.attr('href', contact[type]).attr('target', '_blank');
		}
		var represent = $(document.createElement('i')).addClass(icons[type]);
		var text = $(document.createElement('span')).text(type.toUpperCase());
		link.addClass('mdl-navigation__link').mouseenter(function(){
			$(this).find('i').hide();
			$(this).find('span').text(contact[type]);
		}).mouseleave(function(){
			$(this).find('i').show();
			$(this).find('span').text(type.toUpperCase());
		});
		link.append(represent);
		link.append(text);
		node.append(link);
	});

}

function buildSkills(node, skills){
	var icons = {
		circle : 'fa fa-circle-o'
	};

	skills.map(function(info){
		var container = $(document.createElement('div')).addClass('skill').addClass('mdl-cell').addClass('mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--6-col-phone');
		var title = $(document.createElement('h3')).addClass('type').text(info.name.toUpperCase());
		var listing = $(document.createElement('div')).addClass('list');
		info.list.forEach(function(skill){
			var entry = $(document.createElement('div')).addClass('entry');
			var name = $(document.createElement('span')).addClass('name').text(skill.name);
			var rating = $(document.createElement('span')).addClass('rating');
			for(let i = 0; i < skill.rating; i++){
				rating.append($(document.createElement('i')).addClass(icons.circle)).addClass('mdl-button--accent');
			}
			entry.append(name);
			entry.append(rating);
			listing.append(entry);
		});
		container.append(title);
		container.append(listing);
		return container;
	}).forEach(function(skillNode){
		node.append(skillNode);
	});
}

function buildProjects(node, projects){

	projects.map(function(project){
		var container = $(document.createElement('div')).addClass('project').addClass('mdl-cell');
		var card = $(document.createElement('div')).addClass('mdl-card mdl-shadow--2dp demo-card-square');
		var titleContainer = $(document.createElement('div')).addClass('mdl-card__title').css('background', 'url(' + project.image + ') center/cover');
		var title = $(document.createElement('h3')).addClass('title').addClass('mdl-card__title-text').text(project.name);
		var link = $(document.createElement('a')).addClass('target', '_blank').attr('href', project.link).text('Visit').addClass('mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect');
		// var image = $(document.createElement('img')).attr('src', project.image);
		var supportingContainer = $(document.createElement('div')).addClass('mdl-card__supporting-text');
		var description = $(document.createElement('p')).addClass('description').text(project.description);
		var actionContainer = $(document.createElement('div')).addClass('mdl-card__actions mdl-card--border');
		var tech = $(document.createElement('div')).addClass('techContainer');
		project.tech.forEach(function(item){
			var tag = $(document.createElement('span')).addClass('tech').text(item.name).addClass('mdl-button mdl-js-button mdl-button--raised mdl-button--colored');
			tech.append(tag);
		});
		titleContainer.append(title);
		supportingContainer.append(description);
		supportingContainer.append(tech);
		actionContainer.append(link);
		card.append(titleContainer);
		card.append(supportingContainer);
		card.append(actionContainer);
		container.append(card);
		return container;
	}).forEach(function(project){
		node.append(project);
	});
}