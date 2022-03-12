import React from 'react';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

function App() {
	return (
		<div className='App'>
			<PostCreate />
			<hr />
			<PostList />
		</div>
	);
}

export default App;
