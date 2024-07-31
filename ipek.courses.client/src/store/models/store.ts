import { types } from 'mobx-state-tree';

import { profileModel } from './profile';

export const storeModel = types.model({
	profile: types.maybe(profileModel),
});
