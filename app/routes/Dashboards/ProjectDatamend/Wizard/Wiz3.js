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
    UncontrolledDropdown,
    CardTitle,
    CustomInput,
    FormText    
} from './../../../../components';



const WizardStep3 = () => (
    <Row>
                <Col lg={ 12 }>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6" className="mb-4">
                                Forms Inline: Preview Example
                                <span className="small ml-1 text-muted">
                                    #2.01
                                </span>
                            </CardTitle>
                            { /* START Form */}
                            <Form inline>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="text" name="text" id="enterName" placeholder="Enter Name..." />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <i className="fa fa-key fa-fw" />
                                        </InputGroupAddon>
                                        <Input type="password" name="password" placeholder="Password..." />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            Country
                                        </InputGroupAddon>
                                        <CustomInput type="select" id="country-selector-3" name="customSelect">
                                            <option value="">Select...</option>
                                            <option>United Kingdom</option>
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Australia</option>
                                            <option>New Zeland</option>
                                        </CustomInput>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <CustomInput type="checkbox" id="rememberMe" label="Remember Me" inline />
                                </FormGroup>
                                <Button color="primary">
                                    Submit
                                </Button>
                            </Form>
                            { /* END Form */}
                        </CardBody>
                    </Card>
                </Col>
    </Row>
);

class Wiz3 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep3 />
                    </CardBody>

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

export default Wiz3;

