import { randomInt } from 'crypto';
import { getRandomArbitrary } from '../Helper/Util';
import './Game.css';

interface Props {
	loading: boolean,
	title: string,
	content: string
}

export default function Game(props: Props) {

	const loadingTitleClass = (props.loading) ? "skeleton-title" : "";
	const loadingContentClass = (props.loading) ? "skeleton-content" : "";

	const loadingContentSkeleton = [];
	if (props.loading) {

		for (let c = 0; c < getRandomArbitrary(1, 6); c++) {
			loadingContentSkeleton.push(<span key={c}></span>);
		}

	}
	function loadingAndEmptyOrValue(value: string) {
		if (props.loading)
			return "";
		
		return value;
	}

	return (
			<div className="row justify-content-center pt-3	font-monospace" style={{"minHeight": "60vh"}}>
				<div className="col-12">

					<div className="row">
						<div className="col-md-12">
							<span className={"text-start h4 " + loadingTitleClass}>{loadingAndEmptyOrValue(props.title)}</span>
						</div>
					</div>

					<hr/>

					<div className="row">
						<div className="col-md-8">
							<p className={"text-start lead fs-6 " + loadingContentClass}>
								{
									props.loading && loadingContentSkeleton
								}
								{loadingAndEmptyOrValue(props.content)}
							</p>
						</div>

					</div>
				</div>
			</div>
	)
}
