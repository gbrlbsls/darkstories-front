import { Environment } from "../Configs/Environment";
import { fetchWithTimeout } from "../Helper/Util";
import { RequestInitTimed } from '../Models/RequestInit.model';
class API {

	static baseUrl: String = "";

	private static _defaultOptions: RequestInitTimed = {
		timeout: Environment.DEFAULT_API_TIMEOUT
	}

	static _postRequestOptions: RequestInitTimed = {
		...API._defaultOptions,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}

	static _getRequestOptions: RequestInitTimed = {
		...API._defaultOptions,
		method: 'GET',
		mode: "cors",
		redirect: "follow",
		headers: { 'Content-Type': 'application/json' },
	}

	static async post(endpoint: string, data: any = null, requestOptions: RequestInit = {}) {

		let _requestOptions = {
			body: JSON.stringify(data)
		};

		return await fetchWithTimeout(`${this.baseUrl}${endpoint}`, { ..._requestOptions, ...this._postRequestOptions, ...requestOptions });
	}

	static async get(endpoint: string, requestOptions: RequestInit = {}) {
		return await fetchWithTimeout(`${this.baseUrl}${endpoint}`, { ...this._getRequestOptions, ...requestOptions });
	}

}

export default API;