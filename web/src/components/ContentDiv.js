import React from 'react'

let ContentDiv = React.createClass({
    getInitialState:function(){
        /**
         * cursor鼠标样式
         * changeType变化方式
         * 			movePosition 移动
         * 			changeSize 大小
         */
        return ({top:this.props.top,left:this.props.left,height:this.props.height,width:this.props.width,cursor:"move",changeType:"movePosition",mouseTop:0,mouseLeft:0});
    },
    setDivPosition:function(cTop,cLeft,mouseTop,mouseLeft){
        if(this.isOutStrip(this.state.top + cTop,this.state.left + cLeft,this.state.width,this.state.height)){
            this.setState({mouseTop:mouseTop,mouseLeft:mouseLeft});
        }else {
            this.setState({top:this.state.top + cTop,left:this.state.left + cLeft,mouseTop:mouseTop,mouseLeft:mouseLeft});
        }
    },
    setDivSize:function(cwidth,cheight,mouseTop,mouseLeft){
        if(this.isOutStrip(this.state.top,this.state.left,this.state.width + cwidth,this.state.height + cheight)){
            this.setState({mouseTop:mouseTop,mouseLeft:mouseLeft});
        }else {
            this.setState({width:this.state.width + cwidth,height:this.state.height + cheight,mouseTop:mouseTop,mouseLeft:mouseLeft});
        }
    },
    setDivCursor:function(cursor,changeType){
        this.setState({cursor:cursor,changeType:changeType});
    },
    setMousePostion:function(mouseTop,mouseLeft){
        this.props.onselected(this.props.con_id);
        this.setState({mouseTop:mouseTop,mouseLeft:mouseLeft});
    },
    isOutStrip:function(top, left, width, height){/*是否超出*/
        let mould_container = document.getElementById("add_new_mould_container");
        if(top>=0 && left>=0 && left+width<=mould_container.offsetWidth && top+height<=mould_container.offsetHeight){
            return false;
        }else {
            return true;
        }
    },
    render:function(){
        return (
            <div onMouseDown={(event)=>{
                }
            } style={{top:this.state.top+"px",left:this.state.left+"px",height:this.state.height+"px",width:this.state.width+"px",cursor:this.state.cursor,position: "absolute",border: "1px solid"}}>
                <div style={{cursor:this.state.cursor,width: "100%",height: "100%",lineHeight: "100%",fontSize: this.props.fontSize,fontFamily: this.props.fontFamily,fontWeight: this.props.fontWeight,backgroundColor:this.props.selected}} onMouseDown={(event)=>{
                    if(this.state.changeType == "movePosition"){
                        document.onmousemove=function(event){
                            let cTop = event.clientY - this.state.mouseTop;
                            let cLeft = event.clientX - this.state.mouseLeft;
                            this.setDivPosition(cTop, cLeft, event.clientY, event.clientX);
                        }.bind(this);
                    }else {
                        document.onmousemove=function(event){
                            let cTop = event.clientY - this.state.mouseTop;
                            let cLeft = event.clientX - this.state.mouseLeft;
                            this.setDivSize(cLeft, cTop, event.clientY, event.clientX);
                        }.bind(this);
                    }
                    document.onmouseup=function(event){
                        document.onmousemove=function(event){
                        };
                        this.props.getPositionAndSize(this.state.top,this.state.left,this.state.height,this.state.width);
                    }.bind(this);
                    this.setMousePostion(event.clientY,event.clientX);
                }} onMouseMove={(event)=>{
                    const mould_container = document.getElementById("add_new_mould_container").getBoundingClientRect();
                    let mtop = event.clientY-mould_container.top-this.state.top;
                    let mleft = event.clientX-mould_container.left-this.state.left;
                    if(mtop > this.state.height-5 && mleft > this.state.width-5){
                        this.setDivCursor("nw-resize","changeSize");//改变大小
                    }else {
                        this.setDivCursor("move","movePosition");//移动
                    }
                }}>
                    {this.props.content}
                </div>
            </div>
        );
    }
});

export default ContentDiv
