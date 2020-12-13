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
    UncontrolledDropdown,
    CardTitle,
    CustomInput,
    FormText,
        UncontrolledModal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from './../../../../components';
import FieldEditorRow from './FieldEditorRow';
import {WIZ_START} from './../src/shared/wizstart';
import ApplyChangesModal from './ApplyChangesModal';

const makeId = (name,index) => {
    return `${name}_${index}`;
}


const WizardStep3 = ({wizardState}) => {
  const initSelAll = (allFields) => {
    let ar = [];
    for(let i = 0; i < allFields.length; i++) {
        ar.push(allFields[i].active);
    }
    return ar;
  }
  const [selectFlags, setSelectFlags] = React.useState(initSelAll(wizardState.allFields));
  const [selectAll, setSelectAll] = React.useState(false);


  const onSelFlag = (i,flag) => {
    console.log(flag);
    let ar = [...selectFlags];
    ar[i] = flag;
    setSelectFlags(ar);
    //setSelectAll(flag ? 1 : 0);
  }
  const rowEditors = wizardState.allFields.map((dish,i) => {
    return (
      <FieldEditorRow fieldSpec={dish} index={i} selectFlag={selectFlags[i]} onSelFlag={onSelFlag} />
    );
  });

  const mySelAll = (flag) => {
    console.log(flag);
    let ar = Array(selectFlags.length).fill(flag)
    setSelectFlags(ar);
    setSelectAll(flag);
  }

    return (
    <Row>
        <Col lg={ 12 }>
            <Card className="mb-3">
                <CardBody>
                    <CardTitle tag="h6" className="mb-4">
                        Fields - {wizardState.typeName} [{wizardState.planId}]
                        <span className="small ml-1 text-muted">
                            #2.01
                        </span>
                    </CardTitle>
                    <Table>
                      <thead>
                        <tr>
                          <th>Use this field <br/>
                             <CustomInput type="checkbox" id="selall" inline checked={selectAll}
                                onChange={(e) => mySelAll(e.target.checked)} />                              
                          </th>
                          <th>Field</th>
                          <th>Sample Value</th>
                          <th>Value can be missing</th>
                          <th>Primary Key</th>
                          <th>Rules</th>
                        </tr>
                      </thead>
                      <tbody>
                          {rowEditors}
                      </tbody>
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


                    <Row className="mb-5">
                      <ApplyChangesModal />
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
        console.log("aaaaaaaaaaaaaaaaaaaa2");
        console.log(this.wizardState.typeName);
        this.props.nextStep();
    }

//    _isComplete = (stepId) =>
//        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

export default Wiz3;

