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



const WizardStep1 = () => (
    <Row>
        <Col md={ 10 }>
            <div>
                <h3 className="mb-4">
                    Paste Some CSV Data xxxx
                </h3>

                                { /* START Input */}
                                <FormGroup row>
                                    <Label for="textArea" sm={3}>
                                        Textarea
                                    </Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="textarea" 
                                            name="text" 
                                            id="textArea" 
                                            placeholder="Enter text..." 
                                        />
                                    </Col>
                                </FormGroup>
                                { /* END Input */}

                <small>
                    Below is a sample page for your cart, 
                    Created using pages design UI Elementes
                </small>
            </div>
        </Col>
        <Col md={ 6 }>
        </Col>
    </Row>
);

class Wiz1 extends React.Component {

    render() {

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep1 />
                    </CardBody>

                    <CardFooter className="p-4 bt-0">
                        <div className="d-flex">
                            {
                                true && (
                                    <Button onClick={() => {this._prevStep()}} color="link" className='mr-3'>
                                        <i className='fa fa-angle-left mr-2'></i>
                                        xPrevious
                                    </Button>
                                )
                            }
                            {
                                true && (
                                    <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                        xNext
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
    }

    _nextStep = () => {
    }

//    _isComplete = (stepId) =>
//        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

export default Wiz1;

