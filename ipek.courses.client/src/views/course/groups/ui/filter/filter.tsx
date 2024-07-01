import './filter.styl';

import iconCheck from '@img/constructor/check.svg';
import React from 'react';
interface ICourseGroupsFilter {
	name: string;
	img: string | React.ReactNode;
	dropdownItems: string[];
}

const CourseGroupsFilter = ({ dropdownItems, img, name }: ICourseGroupsFilter): React.JSX.Element => {
	return (
		<div className='filter'>
			<button>
				<p>{name}</p>
				{typeof img === 'string' ? <img src={img} alt='' /> : img}
			</button>
			<div className='filter__dropdown'>
				{dropdownItems.map((dI, i) => {
					return (
						<label key={dI + i}>
							<input type='checkbox' />
							<span>
								<img src={iconCheck} alt='' />
							</span>
							<p>{dI}</p>
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default CourseGroupsFilter;
