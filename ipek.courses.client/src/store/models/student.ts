import { types } from 'mobx-state-tree';

export const studentModel = types.model({
	id: types.identifier,
	group: types.string,
	fullname: types.string,
	login: types.string,
	password: types.string,
});
