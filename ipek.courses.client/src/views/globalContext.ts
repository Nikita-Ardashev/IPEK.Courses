import { createContext } from 'react';

import { type IUser } from '@/common/api/api';
export interface IGlobalContext {
	user: IUser | null;
}

export const GlobalContext = createContext<IGlobalContext | null>(null);
