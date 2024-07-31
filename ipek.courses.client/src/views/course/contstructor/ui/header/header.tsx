import './header.styl';

import iconArrow from '@img/constructor/arrow.svg';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { constructorSaveCode, courseTask } from '@/common/api/api';

import { type IConstructorHeader, type TLanguages } from '../../model/types';

const ConstructorHeader = ({ isReadonly, time, title }: IConstructorHeader): React.JSX.Element => {
	const data = null;
	const [searchParams] = useSearchParams();
	const [getTimer, setTime] = useState<string>(time ?? '00:00:00');
	const [getTitle, setTitle] = useState<string>(title ?? '');
	const save = (): void => {
		const courseId = searchParams.get('courseId') === null ? null : Number(searchParams.get('courseId'));
	};
	const studieId = searchParams.get('studieId') === null ? null : Number(searchParams.get('studieId'));

	useEffect(() => {
		courseTask(studieId)
			.then((r) => {
				setTime(r?.study.time ?? '00:00:00');
				setTitle(r?.study.name ?? '');
			})
			.catch((e) => {
				console.error(e);
			});
	}, [studieId]);
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
				<input type='button' className='constructor-header__save' onClick={save} value={'Сохранить'} />
			)}
		</div>
	);
};

export default ConstructorHeader;
