import { types } from 'mobx-state-tree';

export const loginModel = types.model({
	login: types.string,
	password: types.string,
});
