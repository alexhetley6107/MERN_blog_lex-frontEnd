import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import s from './Header.module.scss';
import Container from '@mui/material/Container';
import { logOut, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти ?')) {
			dispatch(logOut());
			window.localStorage.removeItem('token');
		}
	};

	return (
		<div className={s.root}>
			<Container maxWidth='lg'>
				<div className={s.inner}>
					<Link to='/' className={s.logo}>
						<div>LEX BLOG</div>
					</Link>
					<div className={s.buttons}>
						{isAuth ? (
							<>
								<Link to='/add-post'>
									<Button variant='contained'>Написать статью</Button>
								</Link>
								<Button onClick={onClickLogout} variant='contained' color='error'>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to='/login'>
									<Button variant='outlined'>Войти</Button>
								</Link>
								<Link to='/register'>
									<Button variant='contained'>Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
