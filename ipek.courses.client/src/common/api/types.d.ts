import { TUser } from '../types/types';

type IApiCreateGroupForUser = Omit<TUser, 'id' | 'groupId' | 'courseIds'>;

export interface IApiCreateGroupWithUsers {
	groupName: string;
	users: IApiCreateGroupForUser[];
}

export interface IApiWithId {
	id: string;
}

export type IApiCreateUser = Omit<TUser, 'id' | 'phone' | 'courseIds'>;
