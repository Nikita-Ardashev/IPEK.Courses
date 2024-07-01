import './header.styl';

import iconAccount from '@img/Account.svg';
import iconAccountMultiplePlus from '@img/admin/account-multiple-plus.svg';
// import iconAccountPlus from '@img/admin/account-plus.svg';
import iconCoursePlus from '@img/admin/course-plus.svg';
import Logout from '@img/logout.svg';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { logout } from '@/common/api/api';
import { GlobalContext } from '@/views/globalContext';

import Modal from '../modal/modal';
import { type IModalEditType, type IModalType } from '../modal/model/types';
import HeaderNav from './ui/headerNav/nav';

const Header = (): React.JSX.Element => {
	const globalContext = useContext(GlobalContext);
	const user = globalContext?.user;
	const isAdmin = user?.is_admin ?? false;
	const [isLogin, setIsLogin] = useState(localStorage.getItem('token') !== null);

	const name = user?.name ?? '';
	const [isViewModal, setIsViewModal] = useState<boolean>(false);
	const [modal, setModal] = useState<React.ReactNode | null>();
	const viewModal = (typeModalBox: IModalType, typeModal: IModalEditType, onCreate: () => void): void => {
		setModal(<Modal type={typeModalBox} data={{ type: typeModal, onCreate }} setView={setIsViewModal} />);
		setIsViewModal(true);
	};
	const post = (): void => {};
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		setIsLogin(localStorage.getItem('token') !== null);
	}, [location]);
	return (
		<>
			{isAdmin && isViewModal && modal}
			<header>
				<Link to={'/'} className='header__logo'>
					ИПЭК.КУРСЫ
				</Link>
				{isLogin ? (
					<div className='header__profile'>
						<p>{name}</p>
						<Link to={'profile'}>
							<img src={iconAccount} alt='' />
						</Link>
						<div className='header__profile-dropdown'>
							{isAdmin && (
								<>
									{/* <HeaderNav
										img={iconAccountPlus}
										text='Добавить ученика'
										onclick={() => {
											viewModal('create', 'student', post);
										}}
									/> */}
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
								onclick={() => {
									void logout().finally(() => {
										setIsLogin(false);
										console.log(localStorage.getItem('token'));
										navigate('/login');
									});
								}}
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
