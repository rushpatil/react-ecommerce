//Rest APIs for product

export const getAllProducts = (accessToken) => {
	let promiseResolve = null;
	let promiseReject = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	fetch('http://localhost:8080/api/products', {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.json().then((json) => {
			if(response.ok) {
				promiseResolve({
					data: json,
					response: response,
				});
			} else {
				promiseReject({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseReject({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise;
};

export const createProduct = (requestJson, accessToken) => {
	let promiseResolve = null;
	let promiseReject = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	fetch('http://localhost:8080/api/products', {
		method: 'POST',
		body: JSON.stringify(requestJson),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': `Bearer ${accessToken}`,
			// 'X-Auth-Token': accessToken,
			// Authorization:`Bearer ${accessToken}`,
		},
	}).then((response) => {
		response.text().then((json) => {
			if(response.ok) {
				promiseResolve({
					message: "Product " + requestJson.name + " added successfully.",
					response: response,
				});
			} else {
				let message = json.message;
				if(message === undefined || message === null) {
					message = "Server error occurred. Please try again.";
				}
				promiseReject({
					reason: message,
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseReject({
			reason: "Some error occurred. Please try again.",
			response: err,
		});
	});
	return promise;
};

export const deleteProduct = (id, accessToken) => {
	let promiseResolve = null;
	let promiseReject = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	fetch('http://localhost:8080/api/products/'+id, {
		method: 'DELETE',
		headers: {
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.text().then(() => {
			if(response.ok) {
				promiseResolve({
					response: response,
				});
			} else {
				promiseReject({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseReject({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise;
};

export const modifyProduct = (requestJson, accessToken) => {
	let promiseResolve = null;
	let promiseReject = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	fetch('http://localhost:8080/api/products/' + requestJson.id, {
		method: 'PUT',
		body: JSON.stringify(requestJson),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.text().then((json) => {
			if(response.ok) {
				promiseResolve({
					message: "Product " + requestJson.name + " modified successfully.",
					response: response,
				});
			} else {
				let message = json.message;
				if(message === undefined || message === null) {
					message = "Server error occurred. Please try again.";
				}
				promiseReject({
					reason: message,
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseReject({
			reason: "Some error occurred. Please try again.",
			response: err,
		});
	});
	return promise;
};

export const viewProduct = (id, accessToken) => {
	let promiseResolve = null;
	let promiseReject = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	fetch('http://localhost:8080/api/products/'+id, {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.json().then((json) => {
			if(response.ok) {
				promiseResolve({
					value: json,
					response: response,
				});
			} else {
				promiseReject({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseReject({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise;
};

export const getAllCategories = (accessToken) => {
	let promiseResolve = null;
	let promiseReject = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	fetch('http://localhost:8080/api/products/categories', {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken,
			'allow-origin': '*',
		},
	}).then((response) => {
		response.json().then((json) => {
			if(response.ok) {
				promiseResolve({
					data: json,
					response: response,
				});
			} else {
				promiseReject({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseReject({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise;
}