import React from 'react';
import Form from 'qnui/lib/form';
import Field from 'qnui/lib/field'
import Select from 'qnui/lib/select';
import moment from 'qnui/lib/moment';
import { DatePicker,Input,Moment,Icon,Button } from 'qnui';

import logistics from '../../../static/logistics'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '1',textarea:'' };
        this.field = new Field(this);
    }

    onSearch = ()=>{
        const values = this.field.getValues();
        const refund_fee_range = [values.refund_fee_start,values.refund_fee_end];
        const time_range = values.time_range.map(time=>time?moment(time).format('YYYY-MM-DD'):"")

        this.props.onSearch({
            time_type:"created"||values.time_type,
            logistics_company:values.logistics_company,
            refund_fee_range:refund_fee_range.toString(),
            time_range : time_range.toString()
        })
    }

    render() {
        const FormItem = Form.Item;
        const init = this.field.init;

        return (
            <div>
                <Form  direction="hoz">
                    <FormItem  label="物流：" style={{width:180}}>
                        <Select {...init('logistics_company')} defaultValue="" style={{width:100}}>
                            {logistics.map((data,i)=><Option value={data.log_name} key={i}>{data.log_name}</Option>)}
                        </Select>&nbsp;
                    </FormItem>
                    <FormItem style={{width:200}}>
                        <Select {...init('time_type')} defaultValue="申请时间" style={{width:150}}>
                            <div value="申请时间">申请时间</div>
                            <div value="处理时间">处理时间</div>
                            <div value="完成时间">完成时间</div>
                        </Select>&nbsp;
                    </FormItem>
                    <FormItem>
                        <DatePicker.RangePicker
                            hasClear={true}
                            // onStartChange={(val, str) => console.log(val, str)}
                            // onEndChange={(val, str) => console.log(val, str)}
                            // onChange={(val, str) => console.log(val, str)}
                            {...init('time_range')}
                        />
                    </FormItem>
                    <FormItem>
                        <div style={{display:'flex',alignItems:'center'}}>
                            退款金额：
                            <Input style={{width:50}} defaultValue="" {...init('refund_fee_start')}></Input>&nbsp;
                            至&nbsp;
                            <Input style={{width:50}} defaultValue="" {...init('refund_fee_end')}></Input>
                        </div>
                    </FormItem>
                    <Button type="primary" onClick={this.onSearch}>高级查询</Button>
                </Form>
            </div>
        );
    }

}

export default Search;
