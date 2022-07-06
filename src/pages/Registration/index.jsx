import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import s from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth);

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: 'Марина Бредун',
			email: 'kissa@gmail.com',
			password: '123123',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));

		if (!data.payload) {
			return alert('Не удалось зарегистрироваться!');
		}

		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<Paper classes={{ root: s.root }}>
			<Typography classes={{ root: s.title }} variant='h5'>
				Создание аккаунта
			</Typography>
			<div className={s.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register('fullName', { required: 'Укажите имя' })}
					className={s.field}
					label='Полное имя'
					fullWidth
				/>
				<TextField
					type='email'
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', { required: 'Укажите почту' })}
					className={s.field}
					label='E-Mail'
					fullWidth
				/>
				<TextField
					type='password'
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Укажите пароль' })}
					className={s.field}
					label='Пароль'
					fullWidth
				/>
				<Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};
