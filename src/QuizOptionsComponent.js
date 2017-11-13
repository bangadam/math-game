import React, {Component} from 'react';

class QuizOptionsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.callParentCheckResults = this.callParentCheckResults.bind(this);

    }

    callParentCheckResults() {
        // eslint-disable-next-line
        this.props.checkResults(this.props.option); 
    }
    render() {
        return ( 
            <div className="fields animated zoomInUp" onClick={this.callParentCheckResults}>
                <div className="field-block">{this.props.option}</div>
            </div>
        )
    }
}

export default QuizOptionsComponent;