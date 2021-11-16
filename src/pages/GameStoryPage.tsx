import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react'
import Game from '../Component/Game';
import DarkStoriesApi from '../Service/DarkStoriesApi';

declare global {
  interface Window { story: any; }
}

interface ParamTypes {
  storyId: string|undefined
}

function GameStoryPage() {

  const {storyId} = useParams<ParamTypes>();   
  let [state, setState] = useState({story: {title:"-",content:"-", resolution: ""}, loading: true});

  console.log("gameStory.mount")
  
  useEffect(() => {
    if (storyId == null)
      return;

      DarkStoriesApi.getStoryById(parseInt(storyId)).then(story => {
        setState({story, loading: false});
      }).catch(err => {
        console.log({err});
        setState({story: {title:"Falha ao carregar...",content:"-", resolution: ""}, loading: false});
      })
  }, [storyId]);
  useEffect(loadResolution, []);

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