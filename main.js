'use strict'
var $ = require('jquery');

$(document).ready(function(){
	$.getJSON('data.json', function(data){
		console.log(data);
		var profile = new Layout(data);
		profile.buildAll();
	});
});

function Layout(data){
	this.data = data;
}

Layout.prototype.buildInfo = function(node){
	var name = $(document.createElement('h2')).text(this.data.info.name);
	var description = $(document.createElement('p')).text(this.data.info.description);
	var image = $(document.createElement('img')).attr('src', this.data.info.image);
	node.append(name);
	node.append(description);
	$('#image').append(image);
};

Layout.prototype.buildContact = function(node){
	var icons = {
		github : 'fa fa-github-alt',
		linkedin : 'fa fa-linkedin',
		email : 'fa fa-envelope',
		phone : 'fa fa-phone'
	};

	var types = Object.keys(this.data.contact);
	types.forEach(function(type){
		var container = $(document.createElement('div')).addClass('connection');
		var link = $(document.createElement('a')).attr('href', this[type]).attr('target', '_blank');
		var represent = $(document.createElement('i')).addClass(icons[type]);
		link.append(represent);
		container.append(link);
		node.append(container);
	}.bind(this.data.contact));

};

Layout.prototype.buildSkills = function(node){
	var icons = {
		circle : 'fa fa-circle-o'
	};

	this.data.skills.map(function(type){
		var container = $(document.createElement('div')).addClass('skill');
		var title = $(document.createElement('h3')).addClass('type').text(type.name);
		var listing = $(document.createElement('div')).addClass('list');
		type.list.forEach(function(skill){
			var entry = $(document.createElement('div')).addClass('entry');
			var name = $(document.createElement('h5')).addClass('name').text(skill.name);
			var rating = $(document.createElement('div')).addClass('rating');
			for(let i = 0; i < skill.rating; i++){
				rating.append($(document.createElement('i')).addClass(icons.circle));
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
};

Layout.prototype.buildProjects = function(node){

	this.data.projects.map(function(project){
		var container = $(document.createElement('div')).addClass('project');
		var title = $(document.createElement('h3')).addClass('title').text(project.name);
		var link = $(document.createElement('a')).addClass('target', '_blank').attr('href', project.link);
		var image = $(document.createElement('img')).addClass('src', project.image);
		var description = $(document.createElement('p')).addClass('description').text(project.description);
		var tech = $(document.createElement('div'));
		project.tech.forEach(function(name){
			var tag = $(document.createElement('span')).addClass('tech').text(name);
			tech.append(tag);
		});
		link.append(image);
		container.append(title);
		container.append(link);
		container.append(description);
		container.append(tech);
		return container;
	}).forEach(function(project){
		node.append(project);
	});
};

Layout.prototype.buildAll = function(){
	var body = document.body;
	var infos = $('#info');
	var contacts = $('#contact');
	var skills = $('#skills');
	var projects = $('#projects');
	this.buildInfo(infos);
	this.buildContact(contacts);
	this.buildSkills(skills);
	this.buildProjects(projects);
};