import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Post } from '../components/Post';
import axios from '../axios';

export const FullPost = () => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.warn(err);
				alert('Ошибка при получении статьи');
			});
	}, []);

	if (isLoading) {
		return <Post isLoading={isLoading} isFullPost />;
	}

	return (
		<Post
			id={data._id}
			title={data.title}
			imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
			user={data.user}
			createdAt={data.createdAt}
			viewsCount={data.viewsCount}
			isFullPost>
			<ReactMarkdown children={data.text} />
		</Post>
	);
};
