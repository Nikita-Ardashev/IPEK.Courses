import './theory.styl';

import React from 'react';

import BoxQuill from '../model/quill/boxQuill';
import { type IConstructorTheory } from '../model/types';

const ConstructorTheory = ({ isReadonly = false, content }: IConstructorTheory): React.JSX.Element => {
	return (
		<div className='constructor-theory'>
			<BoxQuill />
		</div>
	);
};

export default ConstructorTheory;
