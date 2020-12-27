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
//import { useParams } from "react-router-dom";
import Wiz1 from './Wiz1';
import Wiz2 from './Wiz2';
import Wiz3 from './Wiz3';
import Wiz4 from './Wiz4';
import {DevToolbar} from './../src/components/DevToolbar';
import DataStore from './../src/store/DataStore';

import { HeaderMain } from "./../../../components/HeaderMain";

const sequence = ['start', 'rawData', 'fields', 'output'];


export class DWizardExample extends React.Component {
    constructor(props) {
        super(props);
        this.isPrev = this.isPrev.bind(this);
        this.isNext = this.isNext.bind(this);
        //let { type } = useParams();  
        this.state = {
            currentStep: _.first(sequence),
            wizardState: {
              planId: 0,
              allFields: []
            },
            inputType: props.match.params.inputType
        }

        DataStore.setCurrentInputType(props.match.params.inputType);
    }

    doWizSetState = (res) => {
      console.log("plan:" + res.planId);
      let wizardState = {planId:res.planId, allFields: res.allFields};
      if (res.title) {
         wizardState.title = res.title;
         wizardState.typeName = res.typeName;
      }
      this.setState({wizardState:wizardState});   
    }
    getInputTypeName() {
        return this.state.inputType === 'csv' ? "CSV" : "JSON";
    }
 
    render() {
        const { currentStep } = this.state;

        return (
            <Container>
                <DevToolbar />
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
                                {this.getInputTypeName()}  Data
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[1] } disabled={this._isDisabled(sequence[1])}
                                icon={ <i className="fa fa-cube fa-fw"></i> }
                                complete={ this._isComplete(sequence[1]) }
                            >
                                View Raw Data
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[2] } disabled={this._isDisabled(sequence[2])}
                                icon={ <i className="fa fa-credit-card fa-fw"></i> }
                                complete={ this._isComplete(sequence[2]) }
                            >
                                Set Fields
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[3] } disabled={this._isDisabled(sequence[3])}
                                icon={ <i className="fa fa-navicon fa-fw"></i> }
                                complete={ this._isComplete(sequence[3]) }
                            >
                                Output
                            </Wizard.Step>
                        </Wizard>
                    </CardBody>

                    <CardBody className="p-1">
                    {
                        (() => {
                            switch(this.state.currentStep) {
                                case sequence[0]:
                                    return <Wiz1  prevStep={this._prevStep} nextStep={this._nextStep} isPrev={this.isPrev} isNext={this.isNext} 
                                      doNext={this.doWizSetState} inputType={this.state.inputType} />
                                case sequence[1]:
                                    return <Wiz2  prevStep={this._prevStep} nextStep={this._nextStep} isPrev={this.isPrev} isNext={this.isNext} 
                                      doNext={this.doWizSetState} wizardState={this.state.wizardState} inputType={this.state.inputType} />
                                case sequence[2]:
                                    return <Wiz3  prevStep={this._prevStep} nextStep={this._nextStep} isPrev={this.isPrev} isNext={this.isNext} 
                                      doNext={this.doWizSetState} wizardState={this.state.wizardState} inputType={this.state.inputType} />
                                case sequence[3]:
                                    return <Wiz4  prevStep={this._prevStep} nextStep={this._nextStep} isPrev={this.isPrev} isNext={this.isNext} 
                                      doNext={this.doWizSetState} wizardState={this.state.wizardState} inputType={this.state.inputType} />
                            }
                        })()
                    }
                    </CardBody>

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

    _isComplete = (stepId) => {
        return sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
    }
    _isDisabled = (stepId) => {
        let x = sequence.indexOf(stepId) > sequence.indexOf(this.state.currentStep)
        console.log("dis: " + x);
        return x;
    }
    isPrev() {
        return this.state.currentStep !== sequence[0];
    }
    isNext() {
        return this.state.currentStep !== sequence[sequence.length - 1];
    }
}
