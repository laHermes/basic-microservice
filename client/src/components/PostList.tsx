import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
	const [posts, setPosts] = useState<Array<any>>();

	const fetchPosts = async () => {
		const result = await axios.get('http://localhost:4002/posts');
		setPosts(result.data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			{posts &&
				Object.values(posts).map((post: any) => {
					return (
						<div key={post.id}>
							<p>{post.title}</p>
							{/* {post.comments.map((comment: any) => (
								<li key={comment.id}>{comment.content}</li>
							))} */}
							<CommentCreate postId={post.id} />
							<CommentList comments={post.comments} />
						</div>
					);
				})}
		</div>
	);
};

export default PostList;
