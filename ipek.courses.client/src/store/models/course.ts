import { types } from 'mobx-state-tree';

export const codeTaskModel = types.model({
	id: types.identifier,
	name: types.string,
	description: types.string,
	timeForTask: types.number,
	content: types.string,
	task: types.string,
	answer: types.string,
	courseTopicId: types.string,
});

export const testModel = types.model({});

export const courseTopics = types.model({
	id: types.identifier,
	name: types.string,
	description: types.string,
	courseId: types.string,
});

export const coursesModel = types.model({
	id: types.identifier,
	name: types.string,
	description: types.string,
	backgroundImage: types.string,
	icon: types.string,
});
