import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }: any) => {
	const [content, setContent] = useState<string>('');

	const onSubmit = async (event: any) => {
		event.preventDefault();
		await axios.post(`http://posts.com/posts/${postId}/comments`, {
			content,
		});
		setContent('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<label>New Comment</label>
					<input
						type='text'
						placeholder='add comment'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default CommentCreate;
