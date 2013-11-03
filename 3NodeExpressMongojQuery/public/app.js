$(function () {

	'use strict';

	//Keep contacts in memory
	var contactList = [];

	//Get contacts from the server
	var requestContacts = function () {

		$.get('/api/contacts')

			.done(function (res) {
				console.log('Got contacts from the server:', JSON.stringify(res, null, ' '));

				contactList = res;

				renderContactList();
			})

			.fail(function (err) {
				console.log('Failed to get contacts from the server', err);
			});
	};

	requestContacts();

	//Show contacts on the DOM
	var renderContactList = function (filter) {
		var $list = $('ul#contactList'),
			len = contactList.length,
			i = 0,
			current;

		$list.empty();

		for (; i < len; i++) {

			current = contactList[i].name;

			if (typeof filter === 'undefined' ||
				current.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

				$list.append('<li>' + current + '</li>');
			}

		}
	};

	$('input#searchField').on('keyup', function () {

		var name = $('input#searchField').val();

		renderContactList(name);
	});

	var addContact = function (obj) {

		$.ajax({
			type: 'POST',
			url: '/api/contacts',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data: JSON.stringify(obj)
		})

			.done(function (res) {
				console.log('Got a response from the server:', JSON.stringify(res, null, ' '));

				contactList.push(res);
				renderContactList();
			})

			.fail(function (err) {
				console.log('Failed to addd contact', err);
			});
	};

	$('input#addBtn').on('click', function () {
		var name = $('input#nameField').val(),
			age = parseInt($('input#ageField').val(), 10);

			console.log('Adding:', name, age);

			addContact({name: name, age: age});

	});

});