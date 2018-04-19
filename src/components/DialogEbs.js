import React from 'react';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';

class DialogEbs extends React.Component {

    render() {
        const footer = <div>
            <Button type="normal">取消</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="primary">确认</Button>
        </div>
        return (
            <Dialog className="dialog-ebs" style={{minWidth:500}} visible={this.props.visible} footer={footer} title={this.props.title} onClose = {this.props.onClose}>
                {this.props.children}
            </Dialog>
        );
    }

}

export default DialogEbs;
