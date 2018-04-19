import React from 'react';
import {Button} from 'qnui';
import Scan from './Scan'
import {Link} from 'react-router'

class Refund extends React.Component {

    render() {
        return (
            <div>
                <Link to="/refund/scan">
                    <Button type="primary">
                        扫码入库
                    </Button>
                </Link>

            </div>
        );
    }

}

export default Refund;
