import './header.sass';

import iconArrow from '@img/constructor/arrow.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { type IConstructorHeader } from '../../model/types';

const ConstructorHeader = ({
	isReadonly,
	time,
	title,
}: IConstructorHeader): React.JSX.Element => {
	const [getTimer, setTime] = useState<string>(time ?? '00:00:00');
	const [getTitle, setTitle] = useState<string>(title ?? '');
	const save = (): void => {};
	return (
		<div className='constructor-header'>
			<Link to={'/course/edit'} type='button' className='constructor-header__return'>
				<img src={iconArrow} alt='' />
				<p>Список</p>
			</Link>
			<input
				type='text'
				className='constructor-header__title'
				placeholder='Название темы'
				autoComplete='off'
				value={getTitle}
				onChange={(e) => {
					!isReadonly && setTitle(e.currentTarget.value);
				}}
				readOnly={isReadonly}
			/>
			<input
				type='time'
				className='constructor-header__timer'
				min='00:00'
				max='60:00'
				value={getTimer}
				onChange={(e) => {
					!isReadonly && setTime(e.currentTarget.value);
				}}
				readOnly={isReadonly}
				step='1'
			/>
			{!isReadonly && (
				<input
					type='button'
					className='constructor-header__save'
					onClick={save}
					value={'Сохранить'}
				/>
			)}
		</div>
	);
};

export default ConstructorHeader;
