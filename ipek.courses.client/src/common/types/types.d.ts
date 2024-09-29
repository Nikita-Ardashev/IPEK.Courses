import { SnapshotIn } from 'mobx-state-tree';

import {
	courseModel,
	courseTopicModel,
	groupModel,
	storeModel,
	userModel,
} from '@/store/models/store';
import { stateType } from '@/store/models/utils';

export type TUser = SnapshotIn<typeof userModel>;
export type TGroup = SnapshotIn<typeof groupModel>;
export type TCourseTopic = SnapshotIn<typeof courseTopicModel>;
export type TCourse = SnapshotIn<typeof courseModel>;
export type TStore = SnapshotIn<typeof storeModel>;
export type TStateType = SnapshotIn<typeof stateType>;
