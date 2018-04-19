import React, {PropTypes} from 'react';

// import './styles/main.css';
import Switch from 'qnui/lib/switch';

function onChange(checked) {
    console.log('switch to ' + checked);
}

class Item extends React.Component {
    render() {
        return (
            <div className="switch-content">
                {
                    this.props.item.map((ele,i)=>(
                        <div className="switcher" key={i}>
                            <Switch defaultChecked={ele.checked} onChange={onChange} size="small" style={{marginTop: 10, marginBottom: 10}}/>
                            <div className="switch-text" key={i}>
                                <b><span className="text-yellow">{ele.option}</span></b>
                                &nbsp;
                                &nbsp;
                                <span>{ele.tip}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Item;
