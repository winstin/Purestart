import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ServiceRate from '../../actions/ServiceRate'
// import {getInitData} from '../../actions/ServiceRate';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import Dialog from 'qnui/lib/dialog';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';

const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    },
    getData = (length) => {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push({
                title: {name: `2000`},
                id: 100306660940 + i,
                time: 2000 + i
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a>Remove({record.id})</a>;
    };
const rowSelection = {
        onChange: onRowClick,
        getProps: (record) => {
            return {
                disabled: record.id === 23324
            };
        }
    };

const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);
class ServiceManger extends Component {
  constructor(props) {
        super(props);

        this.state = {
            dataSource: getData(30),
            visible:false,
            visibles:false
        };

    }

  onSearch(value) {
      console.log(value);
  }

  loadTradeList(){
    let self = this;
    let list = [];
    //gettbtime();

    const {getTradeList} = this.props;
    getTradeList();

  }
  componentWillMount() {
      console.log('Component WILL MOUNT!');
  }

  componentDidMount(){
    console.log("首次渲染页面")
    console.log(this.props)
    const {getInitData} = (this.props);
    getInitData();
  }


   onOpen = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    }

    toggleVisible = () => {
        this.setState({
            visibles: !this.state.visibles
        });
    };

    onVisibleChange = visibles => {
        this.setState({
            visibles
        });
    };

  render() {
        const {containerHeight} = (this.props);
        return (
            <div>
                <Row >
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="渠道名称" className="textClsName"  style={{width:'120px',marginLeft:'0px'}}/>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Button type="primary" style={{width:'100px',marginLeft:'10px'}} >搜索</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen}>添加</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} onClick={this.onOpen}>修改</Button>
                    <Button type="secondary" style={{width:'120px',marginLeft:'10px'}} >冻结/启用</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={this.state.dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight} rowSelection={rowSelection}>
                        <Table.Column title="渠道编号" dataIndex="time" width={100}/>
                        <Table.Column title="公司名称" dataIndex="time" width={100}/>
                        <Table.Column title="执照编号" dataIndex="time" width={100}/>
                        <Table.Column title="渠道类型" dataIndex="time" width={100}/>
                        <Table.Column title="渠道级别" dataIndex="time" width={100}/>
                        <Table.Column title="签约时间" dataIndex="time" width={100}/>
                        <Table.Column title="到期时间" dataIndex="time" width={100}/>
                        <Table.Column title="法人姓名" dataIndex="time" width={100}/>
                        <Table.Column title="法人电话" dataIndex="time" width={100}/>
                        <Table.Column title="所在省份" dataIndex="time" width={100}/>

                        <Table.Column title="所在城市" dataIndex="time" width={100}/>
                        <Table.Column title="详细地址" dataIndex="time" width={100}/>
                        <Table.Column title="法人邮箱" dataIndex="time" width={100}/>
                        <Table.Column title="商务邮箱" dataIndex="time" width={100}/>

                        <Table.Column title="财务邮箱" dataIndex="time" width={100}/>
                        <Table.Column title="APP名称" dataIndex="time"  width={100}/>

                        <Table.Column title="官网地址" dataIndex="time" width={100}/>
                        <Table.Column title="账户类型" dataIndex="time" width={100}/>
                        <Table.Column title="收款户名" dataIndex="time" width={100}/>
                        <Table.Column title="开户行" dataIndex="time" width={100}/>
                        <Table.Column title="收款账户" dataIndex="time" width={100}/>

                        <Table.Column title="状态" dataIndex="time" width={100}/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={2} size="large" />
                </div>
                <Dialog visible={this.state.visible}
                            onOk={this.onClose}
                            closable="esc,mask,close"
                            onCancel={this.onClose}
                            onClose={this.onClose} title="添加">
                        <span style={{fontSize:'24px',marginTop:'7px',width:'80px'}}>基础信息</span>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>公司名称：</span>
                            </div>
                            
                            <Dropdown trigger={<Input placeholder="公司名称" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>执照编号：</span>
                            </div>
                            <Input placeholder="执照编号" className="textClsName"   style={{width:'180px'}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>渠道类型：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="渠道类型" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles1}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>渠道级别：</span>
                            </div>
                            <Input placeholder="渠道级别" className="textClsName"   style={{width:'180px'}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>签约时间：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="签约时间" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles2}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>到期时间：</span>
                            </div>
                            <Input placeholder="到期时间" className="textClsName"   style={{width:'180px'}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>法人姓名：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="法人姓名" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人姓名：</span>
                            </div>
                            <Input placeholder="法人姓名" className="textClsName"   style={{width:'180px'}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>所在省份：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="所在省份" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles2}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>所在城市：</span>
                            </div>
                            <Input placeholder="所在城市" className="textClsName"   style={{width:'180px'}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>详细地址：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="详细地址" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>法人邮箱：</span>
                            </div>
                            <Input placeholder="法人邮箱" className="textClsName"   style={{width:'180px'}} />
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>商务邮箱：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="商务邮箱" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>财务邮箱：</span>
                            </div>
                            <Input placeholder="财务邮箱" className="textClsName"   style={{width:'180px'}} />
                        </Row>

                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>APP名称：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="APP名称" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles3}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>官网地址：</span>
                            </div>
                            <Input placeholder="官网地址" className="textClsName"   style={{width:'180px'}} />
                        </Row>


                        <span style={{fontSize:'24px',lineHeight:'60px'}}>结算信息</span>
                        <Row>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>账户类型：</span>
                            </div>
                            
                            <Dropdown trigger={<Input placeholder="账户类型" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款户名：</span>
                            </div>
                            <Input placeholder="收款户名" className="textClsName"   style={{width:'180px'}} />
                        </Row>
                        <Row className="marginTop">
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px'}}>开户行：</span>
                            </div>
                            <Dropdown trigger={<Input placeholder="开户行" className="textClsName"   style={{width:'180px'}} />}
                                      triggerType="click"
                                      visible={this.state.visibles1}
                                      onVisibleChange={this.onVisibleChange}
                                      safeNode={() => this.refs.button}>
                                {menu}
                            </Dropdown>
                            <div className="flexStyle">
                                <span></span>
                                <span style={{fontSize:'14px',marginTop:'7px',marginLeft:'12px'}}>收款账户：</span>
                            </div>
                            <Input placeholder="收款账户" className="textClsName"   style={{width:'180px'}} />
                        </Row>
                </Dialog>
            </div>
        );
    }
    reduceContent() {
        this.setState({
            dataSource: getData(10)
        });
    }
}

function mapStateToProps(state, ownProps){
    return {
        data:state.ServiceRate.isupdate
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceRate , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 230;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(ServiceManger))
