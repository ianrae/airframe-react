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
    ModalFooter,
    Alert

} from './../../../../components';
import FieldEditorRow from './FieldEditorRow';
import ApplyChangesModal from './ApplyChangesModal';
import { DataGridTable } from './table';
import DataStore from './../src/store/DataStore';
import GridUtil from './../src/util/GridUtil';
import NextPrevButtons from './NextPrevButtons';


const makeId = (name,index) => {
    return `${name}_${index}`;
}


const WizardStep3 = ({wizardState, nextPrevButtons, onUpdateField, updateFields}) => {
  const initSelAll = (allFields) => {
    let ar = [];
    for(let i = 0; i < allFields.length; i++) {
        ar.push(allFields[i].active);
    }
    return ar;
  }
  const [selectFlags, setSelectFlags] = React.useState(initSelAll(wizardState.allFields));
  const [selectAll, setSelectAll] = React.useState(false);
  const [hasSecretPK, setHasSecretPK] = React.useState( () => {
    console.log(wizardState.allFields.length);
    const xx = wizardState.allFields.filter(x => x.name == '__pk');
    console.log(xx);
    return xx.length > 0;
  });


  const onSelFlag = (i,flag) => {
    console.log(flag);
    let ar = [...selectFlags];
    ar[i] = flag;
    setSelectFlags(ar);
    //setSelectAll(flag ? 1 : 0);
  }
  const rowEditors = wizardState.allFields.map((dish,i) => {
    if (dish.name === '__pk') {
        return null;
    }
    return (
      <FieldEditorRow fieldSpec={dish} index={i} selectFlag={selectFlags[i]} onSelFlag={onSelFlag} 
        hasSecretPK={hasSecretPK} onChangeField={onUpdateField} />
    );
  });

  const mySelAll = (flag) => {
    console.log(flag);
    let ar = Array(selectFlags.length).fill(flag)
    setSelectFlags(ar);
    setSelectAll(flag);
  }
  const isTooManyPKs = () => {
    let ar1 = wizardState.allFields;
    let ar2 = updateFields;
    let dupCount = 0;
    for(let i = 0; i < ar1.length; i++) {
      let obj = ar1[i];
      let found = false;
      for(let k = 0; k < ar2.length; k++) {
        let obj2 = ar2[k];
        if (obj2.name === obj.name) {
          if (obj2.isPK) {
            dupCount++;
          }
          found = true;
        }
      }

      if (! found) {
        if (obj.isPK) {
          dupCount++;
        }
      }

    }
    return (dupCount) > 1;
  }

    return (
    <Row>
        <Col lg={ 12 }>
                   {nextPrevButtons}
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
                          <th>
                             <CustomInput type="checkbox" id="selall" inline checked={selectAll}
                                onChange={(e) => mySelAll(e.target.checked)}>
                                Use field
                             </CustomInput>                              
                          </th>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Sample Value</th>
                          <th>Value can be missing</th>
                          { !hasSecretPK && 
                              <th>Primary Key</th>
                          }
                          <th>Rules</th>
                        </tr>
                      </thead>
                      <tbody>
                          {rowEditors}
                      </tbody>
                    </Table>

                    { isTooManyPKs() && 
                      <Alert color="danger">
                            <i className="fa fa-times-circle mr-1 alert-icon"></i> 
                            <span> 
                                <strong className="alert-heading">Error:</strong> Only one field can be the Primary Key.
                            </span>
                        </Alert>
                    }
                </CardBody>
            </Card>
        </Col>
    </Row>
    );
}
class Wiz3 extends React.Component {

    constructor(props) {
        super(props);
        this.setDataGrid = this.setDataGrid.bind(this);
        this.onUpdateField = this.onUpdateField.bind(this);
        this.onPlanUpdate = this.onPlanUpdate.bind(this);

        this.state = {
            showTable: false,
            rowData: [],
            rowCount: 0,
            hdrList: [],
            tblRows: [],
            updateFields: []
        }
    }
    clkApplyButton = () => {
        console.log('apply..');
        this.setState({showTable:true});
    }
    generateRows(hdrList, rowData) {
      if (rowData === undefined || rowData.length === 0) {
          console.log("oopsu");
          return [];
      }
      console.log("genRows");
      return rowData.map((row, i) => {
          let obj = {};
          for(let j =0; j < row.data.length; j++) {
              let name = hdrList[j];
              obj[name] = row.data[j];
          }
          return obj;
      });
    }
    setDataGrid(res) {
      console.log('rows: ' + res.grid.rows.length);
      let xrowData = GridUtil.calcRows(res);
      let hdrs = GridUtil.calcHdrs(res);
      let z = this.generateRows(hdrs, xrowData);
      this.setState({rowData:xrowData, rowCount:res.grid.rows.length, hdrList: hdrs, tblRows: z});
    }
    onUpdateField(field) {
      console.log(field);
      var ar = [];
      for(let i = 0; i < this.state.updateFields.length; i++) {
        let x = this.state.updateFields[i];
        if (x.name === field.name) {         
        } else {
          ar.push(x);
        }
      }
      ar.push(field);

      this.setState({updateFields: ar});
    }
    onPlanUpdate(res) {
      console.log('on plan update');
      this.props.doNext(res);
      this.setState({updateFields: []});
    }

    render() {
        let MabyeGrid = null;
        if (this.state.showTable) {
            MabyeGrid = <DataGridTable wizardState={this.props.wizardState} hdrList={this.state.hdrList} tblRows={this.state.tblRows}/>
        }
        const nextPrevButtons = <NextPrevButtons isPrev={this.props.isPrev} isNext={this.props.isNext} doPrev={this._prevStep} doNext={this._nextStep} />

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep3 wizardState={this.props.wizardState} nextPrevButtons={nextPrevButtons} onUpdateField={this.onUpdateField}
                           updateFields={this.state.updateFields} />
                    </CardBody>


                    <Row className="mb-5">
                      <ApplyChangesModal wizardState={this.props.wizardState} onShowTable={this.clkApplyButton} 
                        setDataGrid={this.setDataGrid} updateFields={this.state.updateFields}
                        onPlanUpdate={this.onPlanUpdate} />
                    </Row>

                    <Row className="">
                      {MabyeGrid}
                    </Row>

                    {nextPrevButtons}
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
        console.log("aaaaaaaaaaaaaaaaaaaa3");
        console.log(this.state.updateFields.length);
        if (this.state.updateFields.length === 0) {
          this.props.nextStep();
        } else {
          //note. are two copies of this code!
            this.setState({isLoading:true});
            const obj = {
              planId: this.props.wizardState.planId,
              fieldL: this.state.updateFields
            };
            DataStore.postWizFieldUpdate(obj)
            .then(res => {
              console.log('okstart');
              console.log(res);
                this.setState({isLoading:false});
                this.props.nextStep();
            },
            (error) => {
                this.setState({isLoading:false});
                console.log('!error');
            });
        }
    }

//    _isComplete = (stepId) =>
//        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

export default Wiz3;

