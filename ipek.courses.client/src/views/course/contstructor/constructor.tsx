import './constructor.sass';

import React, { useContext, useState } from 'react';

import ConstructorCode from './code/code';
import { type IConstructor } from './model/types';
import ConstructorTest from './test/test';
import ConstructorTheory from './theory/theory';
import ConstructorHeader from './ui/header/header';
import ConstructorPagination from './ui/pagination/pagination';
const Constructor = ({ type }: IConstructor): React.JSX.Element => {
	const isReadonly = false;
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
		<div className='constructor'>
			<ConstructorHeader isReadonly={isReadonly} />
			{constructor()}
			<ConstructorPagination page={0} totalPages={0} />
		</div>
	);
};

export default Constructor;
