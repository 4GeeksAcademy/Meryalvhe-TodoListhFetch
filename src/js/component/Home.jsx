import React from "react";

import { Header } from './Header';
import { TodoList } from "./TodoList";
import { Footer } from "./Footer";
import { TryingApis } from "./TryingApis"


//create your first component
const Home = () => {
	return (
		<div className="text-center">

			<Header/>
			<TodoList/> 
			<Footer/>
		
		</div>
	);
};

export default Home;
