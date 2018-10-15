import React from 'react'
import PropTypes from 'prop-types'
import AppActions from '../actions/AppActions';
import {Button, Col} from 'reactstrap'

export default class Reaction extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            answer1Count:0,
            answer2Count:0,
            isActive:true
        };
    }

    incrementAnswer1() {
        var currentAnswer1Count = this.state.answer1Count;
        this.setState({answer1Count: currentAnswer1Count + 1});
    }

    incrementAnswer2 = () => {
        var currentAnswer2Count = this.state.answer2Count;
        this.setState({answer2Count: currentAnswer2Count + 1});
    }

    //Life cycle method
    componentDidMount() {
        this.interval = window.setInterval(this.tick, 100);
        this.setState({remainingMilliseconds: this.props.reactionSeconds});
    }

    //Life cycle method
    componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval);
        }
    }

    tick = () => {
        if (this.state.remainingMilliseconds > 0) {
            this.setState({remainingMilliseconds:
  
            this.state.remainingMilliseconds - 100});
  
        } else {
            window.clearInterval(this.interval);
            this.setState({isActive: false});
        }
      }

      onRemove = () => {
        AppActions.remove(this.props.id);
      }

    render(){
        let {imageUrl, question, answer1, answer2} = this.props;
        return(
            
            <Col lg="3" sm="6" className="border">
                <div>Remaining Time: {this.state.remainingMilliseconds}ms</div>
                <Button onClick={this.onRemove}>Remove</Button><br />
                <img alt="" src={imageUrl} />
                <h3>{question}</h3>
                <Button onClick={this.incrementAnswer1.bind(this)}
                        disabled={!this.state.isActive}>
                    {answer1} ({ Math.round(100 * this.state.answer1Count / 
                        ( this.state.answer1Count + this.state.answer2Count)) || 0 }%)
                </Button>
                <Button onClick={this.incrementAnswer2}
                        disabled={!this.state.isActive}>
                    {answer2} ({ Math.round(100 * this.state.answer2Count / 
                        ( this.state.answer1Count + this.state.answer2Count)) || 0 }%)
                </Button>
            </Col>
        );
    }
}

Reaction.propTypes = {
    question: PropTypes.string.isRequired,
    answer1: PropTypes.any,
    answer2: PropTypes.any,
    imageUrl: PropTypes.string,
    reactionSeconds: PropTypes.number
}

Reaction.defaultProps = {
    question: "What is the answer to life?",
    answer1: "42",
    answer2: "NaN",
    imageUrl: "/assets/default-image.png",
    reactionSeconds: 10000
};