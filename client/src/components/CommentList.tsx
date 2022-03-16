import react from 'react';

const CommentList = ({ comments }: any) => {
	return (
		<div>
			{comments &&
				Object.values(comments).map((comment: any) => {
					return (
						<div key={comment.id}>
							{comment.status === 'approved' ? (
								<li>{comment.content}</li>
							) : comment.status === 'pending' ? (
								<p>Comment moderation in pending</p>
							) : (
								<p>Comment is rejected</p>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default CommentList;
