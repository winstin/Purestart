import React from 'react'

let ContentDivPre = React.createClass({
    render:function(){
        return (
            <div style={{top:this.props.top+"px",left:this.props.left+"px",height:this.props.height+"px",width:this.props.width+"px",position: "absolute",border: "1px solid"}}>
                <div style={{width: "100%",height: "100%",lineHeight: "100%",fontSize: this.props.fontSize,fontFamily: this.props.fontFamily,fontWeight: this.props.fontWeight}}>
                    {this.props.content}
                </div>
            </div>
        );
    }
});

export default ContentDivPre
