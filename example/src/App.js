import React from 'react';
// import logo from './logo.svg';
// import { Demo } from 'dugoly-library';
import './App.css';
import 'dugoly-library/dist/dugoly-library.css'
// import { MyDemo } from 'dugoly-library';
import { Blog } from 'dugoly-library';

function App() {
	return (
		<div className=''>
			{/* <header className=''> */}
			{/* <img src={logo} className='App-logo' alt='logo' /> */}
			{/* <Demo type='success'>HELLO World</Demo> */}
			{/* <MyDemo name="John"></MyDemo> */}
			<Blog></Blog>
			{/* </header> */}
		</div>
	);
}

export default App;
