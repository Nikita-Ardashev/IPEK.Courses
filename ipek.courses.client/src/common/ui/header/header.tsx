import './header.sass';

import {
	iconAccount,
	iconAccountMultiplePlus,
	iconAccountPlus,
	iconCoursePlus,
} from '@assets/assets';
import Logout from '@img/logout.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { store } from '@/store/store';

import Modal from '../modal/modal';
import { type IModalEditType, type IModalType } from '../modal/model/types';
import HeaderNav from './ui/headerNav/nav';

const Header = (): React.JSX.Element => {
	const user = store.profile?.getProfile;
	const isAdmin = user?.roleName === 'Admin';
	const isLogin = user !== undefined;

	const [isViewModal, setIsViewModal] = useState<boolean>(false);
	const [modal, setModal] = useState<React.ReactNode | null>();
	const viewModal = (
		typeModalBox: IModalType,
		typeModal: IModalEditType,
		onCreate: () => void,
	): void => {
		setModal(
			<Modal
				type={typeModalBox}
				data={{ type: typeModal, onCreate }}
				setView={setIsViewModal}
			/>,
		);
		setIsViewModal(true);
	};
	const post = (): void => {};
	return (
		<>
			{isAdmin && isViewModal && modal}
			<header>
				<Link to={'/'} className='header__logo'>
					ИПЭК.КУРСЫ
				</Link>
				{isLogin ? (
					<div className='header__profile'>
						<p>{`${user.firstName} ${user.secondName} ${user.thirdName}`}</p>
						<Link to={'profile'}>
							<img src={iconAccount} alt='' />
						</Link>
						<div className='header__profile-dropdown'>
							{isAdmin && (
								<>
									<HeaderNav
										img={iconAccountPlus}
										text='Добавить ученика'
										onclick={() => {
											viewModal('create', 'student', post);
										}}
									/>
									<HeaderNav
										img={iconAccountMultiplePlus}
										text='Добавить группу'
										onclick={() => {
											viewModal('create', 'group', post);
										}}
									/>
									<HeaderNav
										img={iconCoursePlus}
										text='Добавить курс'
										onclick={() => {
											viewModal('create', 'course', post);
										}}
									/>
								</>
							)}
							<HeaderNav
								img={Logout}
								text='Выйти из аккаунта'
								onclick={() => {}}
							/>
						</div>
					</div>
				) : (
					<Link to={'/login'} className='header__login '>
						Войти
					</Link>
				)}
			</header>
		</>
	);
};

export default Header;
