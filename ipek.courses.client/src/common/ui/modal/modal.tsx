import './modal.sass';

import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';

import { iconClose } from '@/common/assets/assets';

import { type IModalData, type IModalProps, type IModalType } from './model/types';
import ModalCreate from './ui/create/create';
import ModalCourseTask from './ui/createTask/task';
import ModalEdit from './ui/edit/edit';
import ModalWarning from './ui/warning/warning';

const Modal = observer(
	({ type, data, setView }: IModalProps<IModalType>): React.JSX.Element => {
		const exitClickBtn = (): void => {
			setView(false);
		};
		const exitClickBackground = (e: React.MouseEvent<HTMLDivElement>): void => {
			const ct = e.currentTarget;
			const t = e.target;
			if (ct === t) {
				setView(false);
			}
		};
		const modal = useMemo(() => {
			switch (type) {
				case 'create':
					return <ModalCreate {...(data as IModalData['create'])} />;
				case 'edit':
					return <ModalEdit {...(data as IModalData['edit'])} />;
				case 'warning':
					return <ModalWarning {...(data as IModalData['warning'])} />;
				case 'task':
					return <ModalCourseTask {...(data as IModalData['task'])} />;
				default:
					return null;
			}
		}, [type, data]);
		return (
			<div className='modal-box' onMouseDown={exitClickBackground}>
				<div className='modal'>
					<button type='button' className='close' onClick={exitClickBtn}>
						<img src={iconClose} alt='Закрыть' />
					</button>
					{modal}
				</div>
			</div>
		);
	},
);

export default Modal;
