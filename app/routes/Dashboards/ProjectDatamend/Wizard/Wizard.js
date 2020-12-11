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
import Wiz1 from './Wiz1';

import { HeaderMain } from "./../../../components/HeaderMain";

const sequence = ['start', 'rawData', 'fields', 'output'];

const items = [
    {
        name: 'Incredible Metal Keyboard',
        quantity: 22,
        price: '$578.00'
    },
    {
        name: 'Incredible Soft Cheese',
        quantity: 3,
        price: '$278.00'
    },
    {
        name: 'Handcrafted Granite Sausages',
        quantity: 29,
        price: '$465.00'
    },
    {
        name: 'Awesome Metal Gloves',
        quantity: 15,
        price: '$501.00'
    }
];

const WizardStep2 = () => (
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
                <small>
                    Fields marked as <span className="text-danger">*</span> are Required!
                </small>
            </div>
        </Col>
    </Row>
);
const WizardStep3 = () => (
    <Row>
        <Col md={12}>
            <div>
                <h3 className="mb-4">
                    Fields
                </h3>
                <p className="pb-3">
                    Below is a sample page for your cart , Created using pages design UI Elementes.
                </p>
                <small>
                    Invoice are issued on the date of despatch. 
                    Payment terms: Pre-orders: within 10 days of invoice date with 4% discount, 
                    from the 11th to the 30th day net. Re-orders: non-reduced stock items are payable net after 20 days.
                </small>
            </div>
        </Col>
    </Row>
);
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

export class DWizardExample extends React.Component {
    constructor(props) {
        super(props);
        this.isPrev = this.isPrev.bind(this);
        this.isNext = this.isNext.bind(this);
    }

    state = {
        currentStep: _.first(sequence)
    }

    render() {
        const { currentStep } = this.state;

        return (
            <Container>
                <HeaderMain 
                    title="DWizard"
                    className="my-4"
                />
                <Card>
                    <CardBody className="d-flex justify-content-center pt-5">
                        <Wizard
                            activeStep={ currentStep }
                            onStepChanged={ this._changeStep }
                        >
                            <Wizard.Step
                                id={ sequence[0] }
                                icon={ <i className="fa fa-shopping-basket fa-fw"></i> }
                                complete={ this._isComplete(sequence[0]) }
                            >
                                CSV Data
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[1] }
                                icon={ <i className="fa fa-cube fa-fw"></i> }
                                complete={ this._isComplete(sequence[1]) }
                            >
                                View Raw Data
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[2] }
                                icon={ <i className="fa fa-credit-card fa-fw"></i> }
                                complete={ this._isComplete(sequence[2]) }
                            >
                                Fields
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[3] }
                                icon={ <i className="fa fa-navicon fa-fw"></i> }
                                complete={ this._isComplete(sequence[3]) }
                            >
                                Output
                            </Wizard.Step>
                        </Wizard>
                    </CardBody>

                    <CardBody className="p-5">
                    {
                        (() => {
                            switch(this.state.currentStep) {
                                case sequence[0]:
                                    return <Wiz1  prevStep={this._prevStep} nextStep={this._nextStep} isPrev={this.isPrev} isNext={this.isNext} />
                                case sequence[1]:
                                    return <WizardStep2 />
                                case sequence[2]:
                                    return <WizardStep3 />
                                case sequence[3]:
                                    return <WizardStep4 />
                            }
                        })()
                    }
                    </CardBody>

                    <CardFooter className="p-4 bt-0">
                        <div className="d-flex">
                            {
                                currentStep !== sequence[0] && (
                                    <Button onClick={() => {this._prevStep()}} color="link" className='mr-3'>
                                        <i className='fa fa-angle-left mr-2'></i>
                                        Previous
                                    </Button>
                                )
                            }
                            {
                                currentStep !== sequence[sequence.length - 1] && (
                                    <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                        Next
                                        <i className='fa fa-angle-right ml-2'></i>
                                    </Button>
                                )
                            }
                        </div>
                    </CardFooter>
                </Card>
            </Container>
        );
    }

    //do various side effects
    onEndStep() {
        if (this.state.currentStep === 'start') {
            //alert('here');
        }
    }

    _changeStep = (stepId) => {
        this.onEndStep();
        this.setState({
            currentStep: stepId
        });
    }

    _prevStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index - 1]
        });
    }

    _nextStep = () => {
        this.onEndStep();
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index + 1]
        });
    }

    _isComplete = (stepId) =>
        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)

    isPrev() {
        return this.state.currentStep !== sequence[0];
    }
    isNext() {
        return this.state.currentStep !== sequence[sequence.length - 1];
    }
}
