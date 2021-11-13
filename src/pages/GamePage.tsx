import { Link, useHistory, useParams } from 'react-router-dom';
import Game from '../Component/Game';

import React, { Component, useEffect, useState } from 'react'
import DarkStoriesApi from '../Service/DarkStoriesApi';
import { copyTextToClipboard, getCurrentPath, getUrlParam } from '../Helper/Util';
import { render } from '@testing-library/react';

interface ParamTypes {
  storyHash: string|undefined
}

declare global {
  interface Window { story: any; }
}

export function GamePage() {
  let history = useHistory();
  const [state, setState] = useState({story:{id:0,title:"",content:"", resolution: "",hash:0}, loading: true})
  const {storyHash} = useParams<ParamTypes>();

  useEffect(setup, []);

  function setup() {
    if (storyHash == null)
      return newGame();
    
    return loadGame();
  }

  function loadGame() {
    window.history.replaceState({}, document.title, "/" + "");
		DarkStoriesApi.newGame(storyHash).then(res => {
			setState({story: res.story, loading: false});
      window.story = res.story;
		}).catch(err => {
			console.log({err});
			setState({loading: false, story: {id:0,title:"Algo deu errado...",content:"Não foi possível obter uma história...", resolution: "Você se deu mal",hash:0}});
		})
  }

  function newGame() {
    setState({...state, loading: true});
    DarkStoriesApi.newGame().then(res => {
      setState({story: res.story, loading: false});
      window.story = res.story;
    }).catch(err => {
      console.log({err});
      setState({loading: false, story: {id:0,title:"Algo deu errado...",content:"Não foi possível obter uma história...", resolution: "Você se deu mal",hash:0}});
    })
  }

  function openResolution(e: any) {
    var gameResolutionWindow: any = window.open("#story", "_blank", "height=480,width=480");
    gameResolutionWindow.story = window.story;
  }

  function shareStory() {
    copyTextToClipboard(`${getCurrentPath()}story/${window.story.id}`);
    alert("Link para história copiado!")
  }

  function copyStoryHash() {
    copyTextToClipboard(`${getCurrentPath()}${window.story.hash}`);
    alert("Link para jogo da história copiado!")
  }

  function render() {
    return (
      <div>
        <Game title={state.story.title} content={state.story.content} loading={state.loading}></Game>
        <hr></hr>
        <div className="row">
          <div className="btn-group-vertical">

            <div className="btn btn-outline-light" onClick={openResolution}>
              Abrir resolução
            </div>

            <div className="btn btn-outline-light" onClick={newGame}>
              Novo jogo
            </div>

            <div className="btn btn-outline-light" onClick={shareStory}>
              Compartilhar
            </div>

            <div className="btn btn-outline-light" onClick={copyStoryHash}>
              Copiar jogo
            </div>

          </div>
        </div>
      </div>
    )
  }

  return render();
}
