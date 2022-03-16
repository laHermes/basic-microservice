import express from 'express';
import cors from 'cors';
import axios from 'axios';
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
	if (type === 'PostCreated') {
		const { id, title } = data;
		console.log('postCreated', data);
		//create a post
		posts[id] = {
			id,
			title,
			comments: [],
		};
	}
	if (type === 'CommentCreated') {
		const { id, content, postId, status } = data;
		//add a comment
		posts[postId].comments.push({ id, content, status });
	}

	if (type === 'CommentModerated') {
		const { postId, id, status } = data;

		const post = posts[postId];

		const comment = post.comments.find((comment) => comment.id === id);
		//update a comment
		comment.status = status;
		comment.content = content;
	}
};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;
	handleEvent(type, data);
	res.send({});
});

app.listen(4002, async () => {
	console.log('Listening on 4002');
	// get stored events
	const res = await axios
		.get('http://event-bus-srv:4005/events')
		.catch((err) => console.log);

	if (res.data instanceof Array) {
		//iterates stored events events
		for (let event of res.data) {
			handleEvent(event.type, event.data);
		}
	}
});
