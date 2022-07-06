import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import s from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	children,
	isFullPost,
	isLoading,
	isEditable,
}) => {
	const dispatch = useDispatch();

	if (isLoading) {
		return <PostSkeleton />;
	}

	const onClickRemove = () => {
		if (window.confirm('Вы действительно хотите удалить статью ?')) {
			dispatch(fetchRemovePost(id));
		}
	};

	const makeNormDate = (str) => {
		const date = str.slice(0, 10).split('-').reverse().join('.');
		const time = str.slice(11, 16);
		return date + ' ' + time;
	};

	return (
		<div className={clsx(s.root, { [s.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={s.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color='primary'>
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color='secondary'>
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img className={clsx(s.image, { [s.imageFull]: isFullPost })} src={imageUrl} alt={title} />
			)}
			<div className={s.wrapper}>
				<UserInfo {...user} additionalText={makeNormDate(createdAt)} />
				<div className={s.indention}>
					<h2 className={clsx(s.title, { [s.titleFull]: isFullPost })}>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>

					{children && <div className={s.content}>{children}</div>}
					<ul className={s.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
