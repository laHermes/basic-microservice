import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
	const [title, setTitle] = useState<string>('');

	const onSubmit = async (event: any) => {
		event.preventDefault();
		await axios.post('http://localhost:4000/posts', {
			title,
		});
		setTitle('');
	};

	return (
		<>
			<h1>create Post</h1>
			<form onSubmit={onSubmit}>
				<p>Title</p>
				<input
					type='text'
					placeholder='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button onClick={onSubmit}>Submit</button>
			</form>
		</>
	);
};

export default PostCreate;
