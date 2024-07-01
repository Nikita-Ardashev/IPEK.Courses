import './course.styl';

import iconUpload from '@img/admin/upload.svg';
import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { type ICourse } from '@/common/api/api';
import CourseCard from '@/common/ui/courseCard/card';
import { getColor } from '@/common/utils/getColor';

import ModalField from '../field/field';

interface IModalCourse {
	useCallbackData: Dispatch<SetStateAction<ICourse>>;
}

const ModalCourse = (props: IModalCourse): React.JSX.Element => {
	const [imgSrc, setImgSrc] = useState<string>('');
	const [icon, setIcon] = useState<File | null>(null);
	const [background, setBackground] = useState<string>('rgba(0,0,0,0.4)');
	const [name, setName] = useState<string>('Название');
	const [category, setCategory] = useState<string>('Категория');
	const changeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setName(e.currentTarget.value);
	};
	const changeCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCategory(e.currentTarget.value);
	};
	const upload = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const t = e.currentTarget;
		if (t.files === null) return;
		const file = t.files[0];
		setIcon(file);
		if (!file.type.includes('svg')) {
			alert('Разрешены только изображения формата .svg');
			return;
		}
		if (file.size / Math.pow(1024, 2) > 10) {
			alert('Изображение весит больше 10мб');
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const src = event?.target?.result;
			if (src === null || src === undefined || typeof src !== 'string') return;
			const img = new Image();
			img.src = src;
			img.onload = () => {
				setBackground(getColor(img));
				img.remove();
				t.files = null;
			};
			setImgSrc(src);
		};
		reader.readAsDataURL(file);
	};
	props.useCallbackData({ background, icon, category, title: name });
	return (
		<div className='modal-course'>
			<div className='modal-fields'>
				<ModalField placeholder='Название' onChange={changeName} />
				<ModalField placeholder='Категория' onChange={changeCategory} />
			</div>
			<label>
				<input type='file' hidden onChange={upload} />
				<img src={iconUpload} alt='' />
				<p>Загрузить иконку</p>
			</label>
			<CourseCard
				category={category === '' ? 'Категория' : category}
				name={name === '' ? 'Название' : name}
				img={imgSrc}
				background={background}
			/>
		</div>
	);
};

export default ModalCourse;
