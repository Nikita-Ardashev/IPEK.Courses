import './constructor.styl';

import React, { useContext, useState } from 'react';

import { GlobalContext } from '@/views/globalContext';

import ConstructorCode from './code/code';
import { ConstructorContext } from './model/constructorContext';
import { type IConstructor, type IConstructorCode } from './model/types';
import ConstructorTest from './test/test';
import ConstructorTheory from './theory/theory';
import ConstructorHeader from './ui/header/header';
import ConstructorPagination from './ui/pagination/pagination';
const Constructor = ({ type }: IConstructor): React.JSX.Element => {
	const context = useContext(GlobalContext);
	const user = context?.user;
	const [getData, setData] = useState<Omit<IConstructorCode, 'isReadonly'>>({
		question: { code: '', lang: 'plaintext', quest: '' },
		theory: undefined,
	});

	const isReadonly = !(user?.is_admin ?? false);
	const constructor = (): React.ReactNode => {
		switch (type) {
			case 'test':
				return <ConstructorTest isReadonly={isReadonly} />;
			case 'theory':
				return <ConstructorTheory isReadonly={isReadonly} />;
			case 'code':
			default:
				return <ConstructorCode isReadonly={isReadonly} />;
		}
	};
	return (
		<ConstructorContext.Provider value={{ data: getData, setData }}>
			<div className='constructor'>
				<ConstructorHeader isReadonly={isReadonly} />
				{constructor()}
				<ConstructorPagination page={0} totalPages={0} />
			</div>
		</ConstructorContext.Provider>
	);
};

export default Constructor;
