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
import DataStore from './../src/store/DataStore';
import {Loading} from './../src/components/LoadingComponent';



const WizardStep1 = ({input,onInputChange}) => (
    <Row>
        <Col md={ 10 }>
            <div>
                <h3 className="mb-4">
                    Paste Some CSV Data Here
                </h3>

                                { /* START Input */}
                                <FormGroup row>
                                    <Label for="textArea" sm={3}>
                                        CSV Data
                                    </Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="textarea" 
                                            name="text" 
                                            id="textArea" 
                                            placeholder=""
                                            rows="10"
                                            value={input}
                                            onChange={(e) => onInputChange(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                { /* END Input */}

                <small>
                    Step 1 of 4. Import your CSV data.
                </small>
            </div>
        </Col>
        <Col md={ 6 }>
        </Col>
    </Row>
);

class Wiz1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            input: "",
            delim: ","
        }
    }

    onInputChange = (txt) => {
        console.log('apply..' + txt);
        this.setState({input:txt});
    }
    onDelimChange = (txt) => {
        console.log('apply..' + txt);
        this.setState({delim:txt});
    }

    render() {
        return (
            <React.Fragment>
                <CardBody className="p-5">
                    <WizardStep1 input={this.state.input} onInputChange={this.onInputChange} delim={this.state.delim} onDelimChange={this.onDelimChange} />
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
        console.log("end wiz1");
        console.log("submitWizStart");
        this.setState({isLoading:true});
        const obj = {
          //title: "Plan1", let server decide
          typeName: "Customer",
          csvContent: this.state.input
        };
        DataStore.postWizStart(obj)
        .then(res => {
          console.log('okstart');
          console.log(res);
            this.setState({isLoading:false});
            this.props.doNext(res);
          //history.push('/wiz1rawdata');  
          this.props.nextStep();
        },
        (error) => {
            this.setState({isLoading:false});
            console.log('!error');
        });


    }

//    _isComplete = (stepId) =>
//        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

export default Wiz1;

