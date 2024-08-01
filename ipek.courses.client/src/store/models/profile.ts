import { types } from 'mobx-state-tree';
import { identifier } from 'mobx-state-tree/dist/internal';

import { studentModel } from './student';

export const profileModel = types.union(
	studentModel,
	types.model({
		completedCourses: types.array(identifier),
		assignedCourses: types.array(identifier),
		isAdmin: types.boolean,
		isTeacher: types.boolean,
	}),
);
