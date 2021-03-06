import Api from "./Api";

class DarkStoriesApi extends Api{
	static baseUrl: String = "https://hidden-wildwood-83104.herokuapp.com";

	static async newGame(storyHash: string|null = null) {

		let endpoint = "";
		if(storyHash != null)
			endpoint = `/game/new-game-from-story-hash`;
		else
			endpoint = "/game/new-game";

		return (await this.post(endpoint, storyHash)).json();
	}

	static async getStoryById(storyId: number) {
		return await (await this.get(`/story/get-story-by-id?id=${storyId}`)).json();
	}

}

export default DarkStoriesApi;