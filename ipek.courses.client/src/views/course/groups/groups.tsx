import './groups.styl';

import iconArrow from '@img/constructor/arrow.svg';
import iconClearFilter from '@img/constructor/clearFilter.svg';
import iconDatepicker from '@img/constructor/datepicker.svg';
import iconFilter from '@img/constructor/filter.svg';
import React from 'react';

import LargeButton from '@/common/ui/largeButton/largeButton';
import ListItem from '@/common/ui/listItem/listItem';

import CourseGroupsFilter from './ui/filter/filter';
const test = [{ name: 'Miki' }, { name: 'Sasha' }];

const filterCourses = ['1 курс', '2 курс', '3 курс', '4 курс'];

const filterProgress = ['Пройдено', 'Не пройдено'];

const CourseGroups = (): React.JSX.Element => {
	return (
		<div className='groups'>
			<div className='groups__heading'>
				<h2>Группа И-20-3</h2>
				<LargeButton />
			</div>
			<div className='groups__filters'>
				<div>
					<span>
						<p>Фильтры</p>
						<img src={iconFilter} alt='' />
					</span>
					<CourseGroupsFilter
						dropdownItems={filterProgress}
						name='Прохождение'
						img={<img src={iconArrow} style={{ rotate: '-90deg', width: '40px', height: '40px' }}></img>}
					/>
					<CourseGroupsFilter dropdownItems={filterCourses} name='Курс' img={iconDatepicker} />
				</div>
				<LargeButton img={iconClearFilter} />
			</div>
			<div className='groups__list'>
				{test.map((s, i) => {
					return <ListItem to={'1'} key={s.name + i} text={s.name} index={i} isEdit />;
				})}
			</div>
		</div>
	);
};

export default CourseGroups;
