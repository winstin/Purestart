import React from 'react';
import Refund from '../../../components/Refund'

class App extends React.Component {

    render() {
        return (
            <div style={{height:'100%'}}>
                <Refund route={this.props.params}/>
            </div>
        );
    }

}

export default App;
