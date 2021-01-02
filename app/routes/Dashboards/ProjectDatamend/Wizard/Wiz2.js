import React from 'react';
import _ from 'lodash';

import {
    Container,
    Wizard,
    Card,
    Nav,
    NavItem,
    NavLink,
    CardFooter,
    CardBody,
    Button,
    Row,
    Col,
    Table,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from './../../../../components';
import {
    AdvancedTableAIan
} from './table';
import DataStore from './../src/store/DataStore';
import {Loading} from './../src/components/LoadingComponent';
import GridUtil from './../src/util/GridUtil';
import NextPrevButtons from './NextPrevButtons';

const WizardStep2 = ({wizardState, hdrList, tblRows,nextPrevButtons, totalRows, onPageChange}) => (
    <Row>
        <Col md={12}>
            <div>
                <h3 className="mb-4">
                    View Your Data 
                </h3>
                <p>
                    Review your data. If it has not been imported correctly, please go back to the previous step.
                </p>
                <AdvancedTableAIan wizardState={wizardState} hdrList={hdrList} tblRows={tblRows} totalRows={totalRows} onPageChange={onPageChange} />
            </div>
        </Col>
    </Row>
);

class Wiz2 extends React.Component {

    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.onPageChangex = this.onPageChangex.bind(this);

        this.state = {
            isLoading: false,
            rowData: [],
            rowCount: 0,
            hdrList: [],
            tblRows: [],
            totalRows: 0,
            pgNum: 0,
            pgSize: 10
        }
    }

  componentDidMount() {
    this.fetchData(0);
  }
  fetchData(pgNum) {
    this.setState({isLoading:true, pgNum:pgNum});
    console.log("wiz" + this.props.wizardState.planId);
    const obj =  {
      planId: this.props.wizardState.planId,
      pgNum: pgNum,
      pgSize: this.state.pgSize
    }
    DataStore.postWizRawData(obj)
    .then(res => {
      console.log('got view data');
      console.log(res);
      this.setState({isLoading:false});
      this.setDataGrid(res);
    },
    (error) => {
        console.log('!error');
        this.setState({isLoading:false});
    });
  }
  generateRows(hdrList, rowData) {
    if (rowData === undefined || rowData.length === 0) {
        console.log("oopsu");
        return [];
    }
    console.log("genRows");
    return rowData.map((row, i) => {
        let obj = {};
        for(let j =0; j < row.data.length; j++) {
            let name = hdrList[j];
            obj[name] = row.data[j];
        }
        return obj;
    });
  }
  setDataGrid(res) {
    console.log('rows: ' + res.grid.rows.length);
    let xrowData = GridUtil.calcRows(res);
    let hdrs = GridUtil.calcHdrs(res);
    let z = this.generateRows(hdrs, xrowData);
    console.log("genRows2");
    this.setState({rowData:xrowData, rowCount:res.grid.rows.length, hdrList: hdrs, tblRows: z, totalRows: res.grid.totalRows});
  }
  onPageChangex(pp) {
    console.log('onPgChange: ' + pp);
    this.fetchData(pp - 1); //convert to 0.based
  }


    render() {
        const nextPrevButtons = <NextPrevButtons isPrev={this.props.isPrev} isNext={this.props.isNext} doPrev={this._prevStep} doNext={this._nextStep} />

        return (
            <React.Fragment>
                <CardBody className="p-5">
                    <WizardStep2 wizardState={this.props.wizardState} hdrList={this.state.hdrList} tblRows={this.state.tblRows} 
                       nextPrevButtons={nextPrevButtons} totalRows={this.state.totalRows} onPageChange={this.onPageChangex} />
                </CardBody>
                { this.state.isLoading && 
                    <Loading />
                }

                {nextPrevButtons}
            </React.Fragment>
        );
    }

   //do various side effects
   onEndStep() {
//        if (this.state.currentStep === 'start') {
            //alert('here');
//        }
   }


    _prevStep = () => {
        this.props.prevStep();
    }

    _nextStep = () => {
        this.props.nextStep();
    }

//    _isComplete = (stepId) =>
//        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

export default Wiz2;

