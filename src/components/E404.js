import React from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';

export default function({ title, text }){
	return <>
		<h1>{ title }</h1>
		<hr/>
		<div className="alert alert-warning">
			<p>{ text }</p>
			<p>Try start from <Link to={routesMap.root}>Main page</Link></p>
		</div>
	</>
}