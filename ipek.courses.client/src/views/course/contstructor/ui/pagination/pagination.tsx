import './pagination.sass';

import iconArrow from '@img/constructor/arrow.svg';
import React from 'react';
import { Link } from 'react-router-dom';

import LargeButton from '@/common/ui/largeButton/largeButton';

interface IConstructorPagination {
	page: number;
	totalPages: number;
}

const ConstructorPagination = ({ page, totalPages }: IConstructorPagination): React.JSX.Element => {
	return (
		<div className='constructor-pagination'>
			<Link to={''} className='constructor-pagination__btn' type='button'>
				<img src={iconArrow} alt='' />
				<p>Назад</p>
			</Link>
			{page === totalPages ? (
				<LargeButton value='На главную' link='' />
			) : (
				<Link to={''} className='constructor-pagination__btn' type='button'>
					<p>Далее</p>
					<img style={{ rotate: '180deg' }} src={iconArrow} alt='' />
				</Link>
			)}
		</div>
	);
};

export default ConstructorPagination;
