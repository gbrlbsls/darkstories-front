export default class {

	static baseUrl: String = "";
	static _postRequestOptions: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}

	static _getRequestOptions: RequestInit = {
		method: 'GET',
		mode: "cors",
		redirect: "follow",
		headers: { 'Content-Type': 'application/json' }
	}

	static async post(endpoint: string, data: any = null, requestOptions: RequestInit = {}) {

		let _requestOptions = {
			body: JSON.stringify(data)
		};

		return await fetch(`${this.baseUrl}${endpoint}`, {..._requestOptions, ...this._postRequestOptions, ...requestOptions});
	}

	static async get(endpoint: string, requestOptions: RequestInit = {}) {
		return await fetch(`${this.baseUrl}${endpoint}`, {...this._getRequestOptions, ...requestOptions});
	}

}
