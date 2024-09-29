import './course.sass';

import { iconAdminUpload } from '@assets/assets';
import chroma from 'chroma-js';
import React, { useState } from 'react';

import CourseCard from '@/common/ui/courseCard/card';
import { getColor } from '@/common/utils/getColor';
import { store } from '@/store/store';

import ModalField from '../../../field/field';
import Submit from '../sumbit/submit';

const ModalCourse = (): React.JSX.Element => {
	const [imgSrc, setImgSrc] = useState<string>('');
	const [icon, setIcon] = useState<number[]>([]);
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
		if (!file.type.includes('svg')) {
			alert('Разрешены только изображения формата .svg');
			return;
		}
		if (file.size / Math.pow(1024, 2) > 10) {
			alert('Изображение весит больше 10мб');
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const src = event?.target?.result ?? false;
			if (!src) return;
			if (typeof src !== 'string') {
				const byteArray = new Uint8Array(src);
				setIcon(Array.from(byteArray));
				return;
			}
			const img = new Image();
			img.src = src;
			img.onload = () => {
				const gC = getColor(img) as number[];
				const color = chroma.mix(
					chroma.rgb(gC[0], gC[1], gC[2]),
					'#000000',
					0.2,
					'rgb',
				);
				if (color.luminance() < 0.1) {
					setBackground(
						chroma
							.mix(chroma.rgb(gC[0], gC[1], gC[2]), '#fff', 0.8, 'rgb')
							.css(),
					);
				} else if (color.luminance() > 0.5) {
					setBackground(
						chroma
							.mix(chroma.rgb(gC[0], gC[1], gC[2]), '#000', 0.8, 'rgb')
							.css(),
					);
				} else {
					setBackground(color.css());
				}
				img.remove();
				t.files = null;
			};
			setImgSrc(src);
		};
		reader.readAsDataURL(file);

		const readerByte = new FileReader();
		readerByte.onload = (event) => {
			const src = event?.target?.result ?? false;
			if (!src) return;
			if (typeof src !== 'string') {
				const byteArray = new Uint8Array(src);
				setIcon(Array.from(byteArray));
				return;
			}
		};
		readerByte.readAsArrayBuffer(file);
	};
	const onCreate = () => {
		console.log({
			name,
			description: 'Test',
			BackgroundColorCode: background,
			icon,
			category,
		});
		store.fetchCreateCourse({
			name,
			description: 'Test',
			BackgroundColorCode: background,
			icon,
			category,
		});
	};
	return (
		<>
			<div className='modal-course'>
				<div className='modal-fields'>
					<ModalField placeholder='Название' onChange={changeName} />
					<ModalField placeholder='Категория' onChange={changeCategory} />
				</div>
				<label>
					<input type='file' accept='.svg' hidden onChange={upload} />
					<img src={iconAdminUpload} alt='' />
					<p>Загрузить иконку</p>
				</label>
				<CourseCard
					category={category === '' ? 'Категория' : category}
					name={name === '' ? 'Название' : name}
					img={imgSrc}
					background={background}
				/>
			</div>
			<Submit text='Создать' onClick={onCreate} />
		</>
	);
};

export default ModalCourse;
