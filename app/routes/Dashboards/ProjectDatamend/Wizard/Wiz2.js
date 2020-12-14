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


const WizardStep2 = ({wizardState}) => (
    <Row>
        <Col md={12}>
            <div>
                <h3 className="mb-4">
                    View Your Data 
                </h3>
                <p>
                    We respect your privacy and protect it with strong encryption, plus strict policies.
                    Two-step verification, which we encourage all our customers to use.
                </p>
                <AdvancedTableAIan wizardState={wizardState} />
                <small>
                    Fields marked as <span className="text-danger">*</span> are Required!
                </small>
            </div>
        </Col>
    </Row>
);

class Wiz2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            rowData: [],
            rowCount: 0,
            hdrList: []
        }
    }

  componentDidMount() {
    this.setState({isLoading:true});
    console.log("wiz" + this.props.wizardState.planId);
    const obj =  {
      planId: this.props.wizardState.planId
    }
    DataStore.postWizViewData(obj)
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
  setDataGrid(res) {
    console.log('rows: ' + res.grid.rows.length);
    let xrowData = GridUtil.calcRows(res);
    let hdrs = GridUtil.calcHdrs(res);

    console.log("setRowData!");
    console.log(xrowData);
    this.setState({rowData:xrowData, rowCount:res.grid.rows.length, hdrList: hdrs});
  }

    render() {

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep2 wizardState={this.props.wizardState} rowData={this.state.rowData} hdrs={this.state.hdrList} />
                    </CardBody>
                    { this.state.isLoading && 
                        <Loading />
                    }

                    <CardFooter className="p-4 bt-0">
                        <div className="d-flex">
                            {
                                this.props.isPrev() && (
                                    <Button onClick={() => {this._prevStep()}} color="link" className='mr-3'>
                                        <i className='fa fa-angle-left mr-2'></i>
                                        Previous
                                    </Button>
                                )
                            }
                            {
                                this.props.isNext() && (
                                    <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                        Next
                                        <i className='fa fa-angle-right ml-2'></i>
                                    </Button>
                                )
                            }
                        </div>
                    </CardFooter>
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

