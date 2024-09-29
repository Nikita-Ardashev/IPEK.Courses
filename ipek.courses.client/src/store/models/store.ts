import { flow, types } from 'mobx-state-tree';

import {
	apiCreateCourse,
	apiCreateGroupWithStudents,
	apiCreateUser,
	apiGetCourses,
	apiGetGroup,
	apiGetGroups,
	apiGetUser,
	apiGetUsers,
} from '@/common/api/api';
import { IApiCreateGroupWithUsers, IApiCreateUser, IApiWithId } from '@/common/api/types';
import { TCourse, TGroup, TUser } from '@/common/types/types';

import { fetchActionsModel, langToolModel } from './utils';

export const userModel = types
	.model({
		id: types.identifier,
		groupId: types.string,
		courseIds: types.array(types.string),
		firstName: types.string,
		secondName: types.string,
		thirdName: types.string,
		email: types.string,
		phone: types.maybe(types.string),
		roleName: types.union(
			types.literal('Admin'),
			types.literal('Teacher'),
			types.literal('Student'),
			types.null,
		),
		password: types.maybe(types.string),
	})
	.views((self) => ({
		get getProfile() {
			return self;
		},
	}));

export const groupModel = types
	.model({
		id: types.identifier,
		name: types.maybeNull(types.string),
		userIds: types.array(types.string),
	})
	.views((self) => ({
		get getGroup() {
			return self;
		},
	}));

export const courseTopicModel = types.model({
	id: types.identifier,
	name: types.string,
	description: types.string,
	courseId: types.string,
});

export const courseModel = types.model({
	id: types.identifier,
	name: types.string,
	description: types.string,
	BackgroundColorCode: types.string,
	icon: types.array(types.number),
	courseTopics: types.array(types.string),
	category: types.string,
});

export const storeModel = types
	.model({
		profile: types.maybe(userModel),
		groups: types.map(groupModel),
		courses: types.map(courseModel),
		users: types.map(userModel),
		languages: langToolModel,
		fetchActionsModel: fetchActionsModel,
	})
	.actions((self) => ({
		fetchUser: flow(function* (args: IApiWithId) {
			const user: TUser = yield self.fetchActionsModel.fetchData<TUser, IApiWithId>(
				'fetchUser',
				apiGetUser,
				args,
			);
			self.users.set(user.id, user);
			const group = self.groups.get(user.groupId);
			if (group === undefined) return;
			if (group.userIds.some((id) => id !== user.id)) {
				group.userIds.push(user.id);
			}
		}),
		fetchUsers: flow(function* (args: { ids: string[] }) {
			const users: TUser[] = yield self.fetchActionsModel.fetchData<
				TUser[],
				{ ids: string[] }
			>('fetchUsers', apiGetUsers, args);
			users.forEach((u) => {
				self.users.set(u.id, u);
			});
		}),
		fetchCreateStudent: flow(function* (args: IApiCreateUser) {
			const userId: string = yield self.fetchActionsModel.fetchData<
				string,
				IApiCreateUser
			>('fetchCreateStudent', apiCreateUser, args);
			const group = self.groups.get(args.groupId);
			if (group === undefined) return;
			group.userIds.push(userId);
		}),
		fetchGroup: flow(function* (args: IApiWithId) {
			const group: TGroup = yield self.fetchActionsModel.fetchData<
				TGroup,
				IApiWithId
			>('fetchGroups', apiGetGroup, args);
			self.groups.set(group.id, group);
		}),
		fetchGroups: flow(function* () {
			const group: TGroup[] = yield self.fetchActionsModel.fetchData(
				'fetchGroups',
				apiGetGroups,
			);
			self.groups.replace(group.map((g) => [g.id, g]));
		}),
		fetchCreateGroupWithStudents: flow(function* (args: IApiCreateGroupWithUsers) {
			const group: TGroup = yield self.fetchActionsModel.fetchData<
				TGroup,
				IApiCreateGroupWithUsers
			>('fetchCreateGroupWithStudents', apiCreateGroupWithStudents, args);
			self.groups.set(group.id, group);
		}),
		fetchCourses: flow(function* () {
			const courses: TCourse[] = yield self.fetchActionsModel.fetchData(
				'fetchCourses',
				apiGetCourses,
			);
			self.courses.replace(courses.map((c) => [c.id, c]));
		}),
		fetchCreateCourse: flow(function* (args: Partial<TCourse>) {
			const course: TCourse = yield self.fetchActionsModel.fetchData<
				TCourse,
				Partial<TCourse>
			>('fetchCreateCourse', apiCreateCourse, args);
			console.log(course);
			self.courses.set(course.id, course);
		}),
	}))
	.views((self) => ({
		get getGroups() {
			if (self.groups.size === 0) {
				self.fetchGroups();
			}
			return Array.from(self.groups.values());
		},
		get getCourses() {
			return Array.from(self.courses.values());
		},
		getGroup(id: string) {
			if (!self.groups.has(id)) {
				self.fetchGroups();
			}
			return self.groups.get(id);
		},
		getUser(id: string) {
			if (!self.users.get(id) || self.users.size === 0) {
				self.fetchUser({ id });
			}
			return self.users.get(id);
		},
		get getUsers() {
			return Array.from(self.users.values());
		},
		getUsersFromId(ids: string[]) {
			const users = ids
				.map((id) => self.users.get(id))
				.filter((u) => u !== undefined);
			const missingUsers = ids.filter((id) => !users.some((u) => u.id === id));
			if (missingUsers.length !== 0) {
				self.fetchUsers({ ids: missingUsers });
			}
			return users;
		},
	}));
