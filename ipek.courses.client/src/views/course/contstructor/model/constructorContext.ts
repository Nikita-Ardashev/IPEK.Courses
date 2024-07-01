import { createContext, type Dispatch, type SetStateAction } from 'react';

import { type IConstructorCode } from './types';

type IConstructorData = Omit<IConstructorCode, 'isReadonly'>;
interface IConstructorContext {
	data: IConstructorData;
	setData: Dispatch<SetStateAction<IConstructorData>>;
}

export const ConstructorContext = createContext<IConstructorContext | null>(null);
