import './task.sass';

import React, { useMemo, useState } from 'react';

import { store } from '@/store/store';

import {
	type IModalCreateCourseTheme,
	type IModalTypeCreateTheme,
} from '../../model/types';
import ModalField from '../field/field';
import ModalSwitchBtn from '../switchBtn/switchBtn';

const ModalCourseTask = ({
	type,
	onCreate,
}: IModalCreateCourseTheme): React.JSX.Element => {
	const langNames = store.languages.getLangNames;
	const [modalType, setModalType] = useState<IModalTypeCreateTheme>(type);
	const modal = useMemo(() => {
		switch (modalType) {
			case 'theory':
				return <ModalField placeholder='Название' />;
			case 'test':
				return <ModalField placeholder='Название' />;
			case 'practice':
			default:
				return (
					<div className='modal-fields'>
						<ModalField placeholder='Название' />
						<ModalField
							value='Язык программирования'
							dropdownItems={langNames}
						/>
					</div>
				);
		}
	}, [modalType]);
	const switchModalCreate = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const type = e.currentTarget.dataset.setModalType as IModalTypeCreateTheme;
		setModalType(type);
	};
	return (
		<div className='modal-task'>
			<h2>Создание</h2>
			<span>
				{/* <ModalSwitchBtn type='theory' content='Теория' modalType={modalType} switchModal={switchModalCreate} />
				<ModalSwitchBtn type='test' content='Тест' modalType={modalType} switchModal={switchModalCreate} />
				<ModalSwitchBtn
					type='practice'
					content='Практика'
					modalType={modalType}
					switchModal={switchModalCreate}
				/> */}
			</span>
			{modal}
			<button onClick={onCreate} className='modal__submit'>
				Создать
			</button>
		</div>
	);
};

export default ModalCourseTask;
