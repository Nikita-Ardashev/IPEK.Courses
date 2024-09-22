import { flow, types } from 'mobx-state-tree';

import { apiGetGroups } from '@/common/api/api';

import { fetchActionsModel, langToolModel } from './utils';

export const studentModel = types.model({
	id: types.identifier,
	group: types.string,
	firstName: types.string,
	secondName: types.string,
	thridName: types.string,
	email: types.string,
});

export const userModel = types
	.compose(
		studentModel,
		types.model({
			completedCourses: types.array(types.string),
			assignedCourses: types.array(types.string),
			roleName: types.union(
				types.literal('Admin'),
				types.literal('Teacher'),
				types.literal('Student'),
			),
		}),
	)
	.views((self) => ({
		get getProfile() {
			return self;
		},
	}));

export const groupModel = types
	.model({
		id: types.identifier,
		name: types.string,
		students: types.array(studentModel),
	})
	.views((self) => ({
		get getGroup() {
			return self;
		},
	}));

export const storeModel = types
	.model({
		user: types.maybe(userModel),
		groups: types.array(groupModel),
		courses: types.array(types.null),
		languages: langToolModel,
		fetchActionsModel: fetchActionsModel,
	})
	.actions((self) => ({
		fetchGroups: flow(function* () {
			const data = yield self.fetchActionsModel.fetchData('groups', apiGetGroups);
			self.groups = data;
		}),
		// fetchCourses: flow(function* () {
		// 	self.fetchActionsModel.courses.state = 'loading';
		// 	const r = yield apiGetCourses();
		// 	try {
		// 		self.fetchActionsModel.courses.state = 'done';
		// 		self.courses = r;
		// 	} catch (e) {
		// 		self.fetchActionsModel.courses.state = 'error';
		// 		self.fetchActionsModel.courses.error = e;
		// 		throw new Error(e);
		// 	}
		// }),
		// fetchAddGroups: flow(function* () {
		// 	self.fetchActionsModel.groups.state = 'loading';
		// 	const r = yield apiGetGroups();
		// 	try {
		// 		self.fetchActionsModel.groups.state = 'done';
		// 		self.groups = r;
		// 	} catch (e) {
		// 		self.fetchActionsModel.groups.state = 'error';
		// 		self.fetchActionsModel.groups.error = e;
		// 		throw new Error(e);
		// 	}
		// }),
		getGroup(id: string) {
			return self.groups.find((g) => g.id === id);
		},
		setCourses() {
			return self.courses;
		},
	}))
	.views((self) => ({
		get getGroups() {
			if (self.groups.length === 0) {
				self.fetchGroups();
			}
			return self.groups;
		},
		get getCourses() {
			return self.courses;
		},
	}));
