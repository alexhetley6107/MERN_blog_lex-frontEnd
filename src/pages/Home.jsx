import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPosts } from '../redux/slices/posts';

export const Home = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector((state) => state.auth.data);

	const isPostLoading = posts.status === 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	return (
		<Grid container spacing={4}>
			<Grid xs={12} item>
				{(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
					isPostLoading ? (
						<Post key={index} isLoading={true} />
					) : (
						<Post
							key={obj._id}
							id={obj._id}
							title={obj.title}
							imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
							user={obj.user}
							createdAt={obj.createdAt}
							viewsCount={obj.viewsCount}
							isEditable={userData?._id === obj.user._id}
						/>
					),
				)}
			</Grid>
		</Grid>
	);
};
