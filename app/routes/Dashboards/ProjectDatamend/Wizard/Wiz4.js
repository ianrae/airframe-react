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
import FullRunModal from './FullRunModal';



const WizardStep4 = () => (
    <Row>
        <Col md={12}>
            <div>
                <h3 className="mb-4">
                    Output
                </h3>
                <p className="mb-5">
                    Below is a sample page for your cart , Created using pages design UI Elementes.
                </p>
                <small>Invoice are issued on the date of despatch. Payment terms: Pre-orders: within 10 days of invoice date with 4% discount, from the 11th to the 30th day net. Re-orders: non-reduced stock items are payable net after 20 days.</small>

            </div>
        </Col>
    </Row>
);

class Wiz4 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showTable: false
        }
    }
    clkApplyButton = () => {
        console.log('apply..');
        this.setState({showTable:true});
    }
    setDataGrid(res) {
    }

    render() {
        let MabyeGrid = null;
        if (this.state.showTable) {
            MabyeGrid = <h3> sdfddd ee </h3>
        }

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep4 />
                    </CardBody>


                    <Row className="mb-5">
                      <FullRunModal wizardState={this.props.wizardState} onShowTable={this.clkApplyButton} setDataGrid={this.setDataGrid} />
                    </Row>

                    <Row className="">
                      {MabyeGrid}
                    </Row>

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

export default Wiz4;

