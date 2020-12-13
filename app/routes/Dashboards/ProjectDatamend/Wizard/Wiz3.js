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

import {WIZ_START} from './../src/shared/wizstart';


const FieldEditorRow = () => (
      <tr>
       <td>
       <CustomInput type="checkbox" id="active" inline />
       </td>
       <td>
            <Input type="text" name="text" id="enterName" placeholder="xxEnter Name..." />                              
       </td>
       <td><i>1240 Main st.</i></td>
       <td>
            <CustomInput type="checkbox" id="rememberMe" inline />
       </td>
       <td>
            <CustomInput type="checkbox" id="rememberMe2" inline />
       </td>
       <td>
       </td>
      </tr>

);


const WizardStep3 = ({wizardState}) => {
    console.log('333 ' + wizardState.typeName);
    return (
    <Row>
                <Col lg={ 12 }>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6" className="mb-4">
                                Forms Inlixxxne: Preview - {wizardState.typeName} [{wizardState.planId}]
                                <span className="small ml-1 text-muted">
                                    #2.01
                                </span>
                            </CardTitle>
                            { /* START Form */}
                            <Table>
                              <thead>
                              <th>Selected</th>
                              <th>Field</th>
                              <th>Sample Value</th>
                              <th>Value is Required</th>
                              <th>Primary Key</th>
                              <th>Rules</th>
                              </thead>
                              <tbody>
                              </tbody>
                              <FieldEditorRow />
                              <FieldEditorRow />
                              <FieldEditorRow />
                            </Table>

                        </CardBody>
                    </Card>
                </Col>
    </Row>
    );
}
class Wiz3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            wizardState: WIZ_START
        }
    }

    render() {

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep3 wizardState={this.state.wizardState}/>
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
        console.log("aaaaaaaaaaaaaaaaaaaa2");
        console.log(this.wizardState.typeName);
        this.props.nextStep();
    }

//    _isComplete = (stepId) =>
//        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

export default Wiz3;

