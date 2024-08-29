import './card.sass';

import React from 'react';
import { Link } from 'react-router-dom';

interface ICourseCard {
	name: string;
	category: string;
	img?: string;
	background?: string;
	progress?: number | null;
	linkCourse?: string | null;
	onClick?: () => void;
	isAdmin?: boolean;
}

const CourseCard = ({
	category,
	img,
	name,
	progress = null,
	linkCourse = null,
	onClick = () => {},
	background,
	isAdmin = false,
}: ICourseCard): React.JSX.Element => {
	const content = (
		<>
			<h4 className='course-card__title'>ипэк.курсы</h4>
			<div className='course-card__info'>
				<span>
					<h3>{category}</h3>
					<h2>{name}</h2>
				</span>
				{img !== '' && img !== undefined ? <img src={img} alt='' /> : ''}
			</div>
		</>
	);
	const attrCard = { className: 'course-card', style: { background } };
	return (
		<div onClick={onClick} className='course-card-box'>
			{linkCourse !== null ? (
				<Link to={linkCourse} {...attrCard}>
					{content}
				</Link>
			) : (
				<div {...attrCard}>{content}</div>
			)}
			{isAdmin && (
				<div className='course-card__control'>
					<Link to={'/course/groups'} style={{ background }}>
						Группы
					</Link>
					<Link to={'/course/edit'} style={{ background }}>
						Курс
					</Link>
				</div>
			)}
			{progress !== null && !isAdmin && (
				<div className='course-progress'>
					<p>{progress}/100</p>
				</div>
			)}
		</div>
	);
};

export default CourseCard;
