import { Link, useParams } from 'react-router-dom';

import { withRouter } from "react-router";

import React, { Component, useEffect, useState } from 'react'
import Game from '../Component/Game';
import DarkStoriesApi from '../Service/DarkStoriesApi';

declare global {
  interface Window { story: any; }
}

interface ParamTypes {
  storyId: string|undefined
}

interface Props {
  
}
interface State {
  story: {
    title: string, content: string, resolution: string
  }
}

function GameStoryPage(props: Props) {

  const {storyId} = useParams<ParamTypes>();   
  let [state, setState] = useState({story: {title:"-",content:"-", resolution: ""}, loading: true});

  console.log("gameStory.mount")
  
  useEffect(loadStory, []);
  useEffect(loadResolution, []);

  function loadStory() {
    

    if (storyId == null)
      return;

      DarkStoriesApi.getStoryById(parseInt(storyId)).then(story => {
        setState({story, loading: false});
      }).catch(err => {
        console.log({err});
        setState({story: {title:"Falha ao carregar...",content:"-", resolution: ""}, loading: false});
      })

  }

  function loadResolution() {
    if (window.story == null)
      return;

      setState({story: window.story, loading: false});
  }
  
  function render() {
    return (
      <div>
        <Game title={state.story.title} content={state.story.content} loading={state.loading}></Game>
        <hr></hr>
        <div className="row">
          <div className="col-md-8">
            <p className="text-start lead fs-6">
              {state.story.resolution}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return render();
}

export  { GameStoryPage };