const addUserBtn = document.querySelector('#addUser');
const form = document.querySelector('#form');
const output = document.querySelector('#output');

addUserBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	const formObject = {};

	const formData = new FormData(form);
	for (const [key, value] of formData) {
		formObject[key] = value;
	}

	await fetch('/user/add', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formObject),
	})
		.then(text => text.json())
		.then(response => {
			if (!response.result) {
				alert(response.error)
			}
		})

	await fetch('/user/all')
		.then(text => text.json())
		.then(response => {
			output.innerHTML = '';
			response.data.forEach(({ name, age }) => {
				output.innerHTML += `<p>Name: ${name}, Age: ${age}</p>`;
			});
		})
})