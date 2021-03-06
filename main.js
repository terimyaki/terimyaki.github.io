'use strict';
import {parse} from 'url';
import $ from 'jquery';
import { groups, skills as skillsIndex } from './dictionary';

$(document).ready(function(){
	$.getJSON('data.json', function(data){
		const profile = new Layout(data);
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
		skills = Object.keys(groups).map( type => {
				let info = {
					name : groups[type],
				};
				info.list = skills.filter( skill => skillsIndex[skill.name].group === groups[type])
								.map(skill => {
									let details = skillsIndex[skill.name];
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
		projects = projects.map( project => {
			project.tech = project.tech.map(tag => skillsIndex[tag]);
			return project;
		});
		this._projects = projects;
	}
	render(){
		let body = document.body;
		let infoContainer = $('#info');
		let contactsContainer = $('#contact');
		let skillsContainer = $('#skills');
		let projectsContainer = $('#projects');
		buildInfo(infoContainer, this.info);
		buildContact(contactsContainer, this.contact);
		buildSkills(skillsContainer, this.skills);
		buildProjects(projectsContainer, this.projects);
	}
}

function buildInfo (node, info){
	let name = $(document.createElement('h3')).text(info.name);
	let description = $(document.createElement('h6')).text(info.description);
	node.append(name)
		.append(description);
	$('#image').css('background', 'url(' + info.image +') center/cover');
}

function buildContact(node, contact){
	let icons = {
		github : 'fa fa-github-alt',
		linkedin : 'fa fa-linkedin',
		email : 'fa fa-envelope',
		phone : 'fa fa-phone'
	};

	Object.keys(contact).forEach(function(type){
		let link = $(document.createElement('a'));
		let represent = $(document.createElement('i')).addClass(icons[type]);
		let text = $(document.createElement('span')).text(type.toUpperCase());
		if(type === 'email') link.attr('href', 'mailto:' + contact[type]);
		else if(type === 'phone') link.attr('href', 'tel:' + contact[type]);
		else link.attr('href', 'https://' + contact[type]).attr('target', '_blank');
		link.addClass('mdl-navigation__link')
			.mouseenter(e => $(e.target).find('span').text(contact[type]))
			.mouseleave(e => $(e.target).find('span').text(type.toUpperCase()))
			.append(represent)
			.append(text);

		node.append(link);
	});

}

function buildSkills(node, skills){
	let icons = {
		circle : 'fa fa-circle-o'
	};

	skills.map(function(info){
		let container = $(document.createElement('div'))
								.addClass('skill')
								.addClass('mdl-cell')
								.addClass('mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--6-col-phone');
		let title = $(document.createElement('h3'))
							.addClass('type')
							.text(info.name.toUpperCase());
		let listing = $(document.createElement('div')).addClass('list');
		info.list
			.sort((a, b) => a.rating <= b.rating)
			.forEach(function(skill){
				let entry = $(document.createElement('div')).addClass('entry');
				let name = $(document.createElement('span')).addClass('name').text(skill.name);
				let rating = $(document.createElement('span')).addClass('rating');
				for(let i = 0; i < skill.rating; i++){
					rating.append($(document.createElement('i')).addClass(icons.circle)).addClass('mdl-button--accent');
				}
				entry.append(name)
					.append(rating);
				listing.append(entry);
			});
		container.append(title)
				.append(listing);
		return container;
	}).forEach(function(skillNode){
		node.append(skillNode);
	});
}

function buildProjects(node, projects){

	projects.map(function(project){
		let container = $(document.createElement('div')).addClass('project').addClass('mdl-cell');
		let card = $(document.createElement('div')).addClass('mdl-card mdl-shadow--2dp demo-card-square');
		let titleContainer = $(document.createElement('div')).addClass('mdl-card__title').css('background', 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.2)), url(' + project.image + ') center/cover').css('background-repeat', 'no-repeat');
		let title = $(document.createElement('h3'))
							.addClass('title').addClass('mdl-card__title-text').text(project.name);
		let link = $(document.createElement('a')).addClass('target', '_blank').attr('href', project.link).addClass('mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect');
		if(parse(project.link, true, true).hostname === 'github.com') link.text('See the Github Repo');
		else link.text('Visit The Site');
		let supportingContainer = $(document.createElement('div')).addClass('mdl-card__supporting-text');
		let description = $(document.createElement('p')).addClass('description').text(project.description);
		let actionContainer = $(document.createElement('div')).addClass('mdl-card__actions mdl-card--border');
		let tech = $(document.createElement('div')).addClass('techContainer');
		project.tech.forEach(function(item){
			let tag = $(document.createElement('span')).addClass('tech').text(item.name).addClass('mdl-button mdl-js-button mdl-button--raised mdl-button--colored');
			tech.append(tag);
		});
		titleContainer.append(title);
		supportingContainer.append(description)
						.append(tech);
		actionContainer.append(link);
		card.append(titleContainer)
			.append(supportingContainer)
			.append(actionContainer);
		container.append(card);
		return container;
	}).forEach(function(project){
		node.append(project);
	});
}