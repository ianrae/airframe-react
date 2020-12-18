import React, {useState} from 'react';
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



const WizardStep4 = ({wizardState, onShowTable, setDataGrid, inputType, setInputType}) => {
    return (
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
                <Form>
                    <FormGroup row>
                        <Label for="defaultSelect" sm={3}>
                            Default Select
                        </Label>
                        <Col sm={9}>
                            <Input 
                                type="select" 
                                name="select" 
                                id="defaultSelect" 
                                value={inputType}
                                onChange={(e) => setInputType(e.target.value)}
                            >
                                <option defaultValue="">JSON</option>
                                <option>XML</option>
                                <option>SQL</option>
                                <option>Delia</option>
                                <option>Plain</option>
                            </Input>
                        </Col>
                    </FormGroup>

                   <FullRunModal wizardState={wizardState} onShowTable={onShowTable} setDataGrid={setDataGrid} inputType={inputType} />
                </Form>
            </div>
        </Col>
    </Row>
)};

class Wiz4 extends React.Component {

    constructor(props) {
        super(props);
        this.setDataGrid = this.setDataGrid.bind(this);

        this.state = {
            showTable: false,
            inputType: 'json',
            outputStr: "",
            numLines: 0,
            textAreaRows: 0
        }
    }
    clkApplyButton = () => {
        console.log('apply..');
        this.setState({showTable:true});
    }
    setDataGrid(res) {
        var numLines = 0;
        var textAreaRows = numLines;
        if (res.outputStr) {
            var lines = res.outputStr.split("\n"); 
            var numLines = lines.length;
            textAreaRows = numLines;
            if (lines.length > 0) {
                if (lines[0].length > 40) {
                    textAreaRows = numLines * 2;
                }                
            }
        }

        this.setState({outputStr:res.outputStr, numLines:numLines, textAreaRows:textAreaRows});
    }

    render() {
        let MabyeGrid = null;
        if (this.state.showTable) {
            MabyeGrid = <FormGroup row>
                        <Label for="textArea" sm={3}>
                            Results
                        </Label>
                        <Col sm={12}>
                            <Input  readonly
                                type="textarea" 
                                name="text" 
                                id="textArea" 
                                placeholder=""
                                rows={this.state.textAreaRows}
                                value={this.state.outputStr}
                            />
                        </Col>
                    </FormGroup>
        }

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep4 wizardState={this.props.wizardState} onShowTable={this.clkApplyButton} 
                            setDataGrid={this.setDataGrid}
                            inputType={this.state.inputType} setInputType={this.setInputType} />
                    </CardBody>


                    <Row className="mb-5">
                    </Row>

                    <Row className="">
                      <Col lg={ 12 }>
                        {MabyeGrid}
                      </Col>
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

