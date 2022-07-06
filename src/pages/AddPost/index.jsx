import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link, useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

//library for text redactor
import 'easymde/dist/easymde.min.css';
import s from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';

export const AddPost = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const isAuth = useSelector(selectIsAuth);
	const inputFileRef = React.useRef(null);

	const [loading, setLoading] = React.useState(false);
	const [text, setText] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [imageUrl, setImageUrl] = React.useState('');

	const isEditing = Boolean(id);

	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData();
			const file = e.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setImageUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла!');
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl('');
	};

	const onChange = React.useCallback((text) => {
		setText(text);
	}, []);

	const onSubmit = async () => {
		try {
			setLoading(true);
			const fields = {
				title,
				imageUrl,
				text,
			};

			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields);

			const _id = isEditing ? id : data._id;
			navigate(`/posts/${_id}`);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при создании статьи!');
		}
	};

	React.useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setTitle(data.title);
					setText(data.text);
					setImageUrl(data.imageUrl);
				})
				.catch((err) => {
					console.warn(err);
					alert('Ошибка при получении статьи!');
				});
		}
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button onClick={() => inputFileRef.current.click()} variant='outlined' size='large'>
				Загрузить изображение
			</Button>
			<input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
			{imageUrl && (
				<>
					<img className={s.image} src={`http://localhost:4444${imageUrl}`} alt='Uploaded' />
					<Button variant='contained' color='error' onClick={onClickRemoveImage}>
						Удалить
					</Button>
				</>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: s.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				fullWidth
			/>
			<SimpleMDE className={s.editor} value={text} onChange={onChange} options={options} />
			<div className={s.buttons}>
				<Button onClick={onSubmit} size='large' variant='contained'>
					{isEditing ? 'Cохранить' : 'Опубликовать'}
				</Button>
				<Link to='/'>
					<Button size='large'>Отмена</Button>
				</Link>
			</div>
		</Paper>
	);
};
