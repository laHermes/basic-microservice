import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

const posts: Record<string, any> = {};

app.get('/posts', (req: express.Request, res: express.Response) => {
	res.send(posts);
});

app.post('/posts', async (req: express.Request, res: express.Response) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;

	posts[id] = {
		id,
		title,
	};

	await axios.post('http://event-bus-srv:4005/events', {
		type: 'PostCreated',
		data: {
			id,
			title,
		},
	});

	res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
	console.log('received Event', req.body.type);

	res.send({});
});

app.listen(4000, () => {
	console.log('Listening on 4000');
});
