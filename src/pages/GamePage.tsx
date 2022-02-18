import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Game from '../Component/Game';
import { buildHashUrl, copyTextToClipboard } from '../Helper/Util';
import DarkStoriesApi from '../Service/DarkStoriesApi';

interface ParamTypes {
  storyHash: string | undefined;
}

declare global {
  interface Window {
    story: any;
  }
}

export function GamePage() {
  const [state, setState] = useState({
    story: { id: 0, title: "", content: "", resolution: "", hash: 0 },
    loading: true,
    hiddenResolution: true,
  });
  const { storyHash } = useParams<ParamTypes>();

  useEffect(() => {
    if (storyHash == null) 
      return newGame();

    return loadGame();
  }, []);

  function loadGame() {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.replace(window.location.hash, "#")
    );

    DarkStoriesApi.newGame(storyHash)
      .then((res) => {
        setState({ ...state, story: res.story, loading: false });
        window.story = res.story;
      })
      .catch((err) => {
        console.log('loadGame', { err });
        setState({
          ...state,
          loading: false,
          story: {
            id: 0,
            title: "Algo deu errado...",
            content: "Não foi possível obter uma história...",
            resolution: "Você se deu mal",
            hash: 0,
          },
        });
      });
  }

  function newGame() {
    setState({ ...state, loading: true, hiddenResolution: true });
    DarkStoriesApi.newGame()
      .then((res) => {
        setState({ ...state, story: res.story, loading: false });
        window.story = res.story;
      })
      .catch((err) => {
        console.log('newGame', { err });
        setState({
          ...state,
          loading: false,
          story: {
            id: 0,
            title: "Algo deu errado...",
            content: "Não foi possível obter uma história...",
            resolution: "Você se deu mal",
            hash: 0,
          },
        });
      });
  }

  function showResolution(e: any) {
    setState({ ...state, hiddenResolution: !state.hiddenResolution });
  }

  function openResolution(e: any) {
    var gameResolutionWindow: any = window.open(
      "#story",
      "_blank",
      "height=480,width=480"
    );
    gameResolutionWindow.story = window.story;
  }

  function shareStory() {
    copyTextToClipboard(buildHashUrl(`story/${window.story.id}`));
    alert("Link para história copiado!");
  }

  function copyStoryHash() {
    copyTextToClipboard(buildHashUrl(`hash/${window.story.hash}`));
    alert("Link para jogo da história copiado!");
  }

  function render() {
    return (
      <div>
        <div className="row row-cols-2">
          <div className="col-12 col-md-8">
            <Game
              title={state.story.title}
              content={state.story.content}
              loading={state.loading}
            ></Game>
            {!state.hiddenResolution && (
              <>
                <hr></hr>
                <p className="text-start lead fs-6">{state.story.resolution}</p>
              </>
            )}
          </div>

          <div className="col-12 col-md-4">
            <div className="btn-group-vertical w-100 mt-3 pt-5">
              <button
                className="btn btn-outline-light text-md-start"
                onClick={showResolution}
                disabled={state.loading}
              >
                Mostrar resolução
              </button>

              <button
                className="btn btn-outline-light text-md-start"
                onClick={openResolution}
                disabled={state.loading}
              >
                Abrir resolução
              </button>

              <div className="mb-1"></div>

              <button
                className="btn btn-outline-light text-md-start"
                onClick={newGame}
                disabled={state.loading}
              >
                Novo jogo
              </button>

              <button
                className="btn btn-outline-light text-md-start"
                onClick={shareStory}
                disabled={state.loading}
              >
                Compartilhar
              </button>

              <div className="mb-1"></div>

              <button
                className="btn btn-outline-light text-md-start"
                onClick={copyStoryHash}
                disabled={state.loading}
              >
                Copiar jogo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return render();
}
