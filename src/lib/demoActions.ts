export interface IToDo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export async function getHome(): Promise<IToDo> {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
	const data: IToDo = await res.json();
	return data;
}
