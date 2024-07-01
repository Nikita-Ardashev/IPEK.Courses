import './edit.styl';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { courseThemes, type ICourseThemes } from '@/common/api/api';
import LargeButton from '@/common/ui/largeButton/largeButton';
import ListItem from '@/common/ui/listItem/listItem';
import Modal from '@/common/ui/modal/modal';

const CourseEdit = (): React.JSX.Element => {
	const [isViewAddThemeModal, setIsViewAddThemeModal] = useState<boolean>(false);
	const [dataCourse, setDataCourse] = useState<ICourseThemes | null>(null);
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	useEffect(() => {
		if (id === null) return;
		courseThemes(Number(id))
			.then((r) => {
				setDataCourse(r);
			})
			.catch((e) => {
				console.error(e);
			});
	}, [id]);
	return (
		<div className='edit'>
			{isViewAddThemeModal && (
				<Modal type='task' setView={setIsViewAddThemeModal} data={{ type: 'practice', onCreate: () => {} }} />
			)}
			<div className='edit__heading'>
				<div>
					<h2>Ваш курс ({dataCourse?.course.name})</h2>
					{/* <span>
						<p>Проходят группы: И-20-3, И-20-2, И-20-1...</p>
						<button>
							<p>Смотреть все</p>
						</button>
					</span> */}
				</div>
				<LargeButton
					value='Добавить тему'
					// onClick={() => {
					// 	setIsViewAddThemeModal(true);
					// }}
					link={'/course/constructor/code?courseId=' + id}
				/>
			</div>
			<div className='edit__list'>
				{dataCourse?.study_card.map((s, i) => {
					return (
						<ListItem
							to={`/course/constructor/code?courseId=${id}&studieId=${s.study_id}`}
							key={s.name + i}
							text={s.name}
							index={i}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CourseEdit;
