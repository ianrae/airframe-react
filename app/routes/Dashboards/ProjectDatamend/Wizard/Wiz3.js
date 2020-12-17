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
import ApplyChangesModal from './ApplyChangesModal';
import { DataGridTable } from './table';
import DataStore from './../src/store/DataStore';
import GridUtil from './../src/util/GridUtil';


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
      <FieldEditorRow fieldSpec={dish} index={i} selectFlag={selectFlags[i]} onSelFlag={onSelFlag} hasSecretPK={hasSecretPK} />
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
                          <th>
                             <CustomInput type="checkbox" id="selall" inline checked={selectAll}
                                onChange={(e) => mySelAll(e.target.checked)}>
                                Use this field
                             </CustomInput>                              
                          </th>
                          <th>Field</th>
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

        this.state = {
            showTable: false,
            rowData: [],
            rowCount: 0,
            hdrList: [],
            tblRows: []
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

    render() {
        let MabyeGrid = null;
        if (this.state.showTable) {
            MabyeGrid = <DataGridTable wizardState={this.props.wizardState} hdrList={this.state.hdrList} tblRows={this.state.tblRows}/>
        }

        return (
            <React.Fragment>
                    <CardBody className="p-5">
                        <WizardStep3 wizardState={this.props.wizardState}/>
                    </CardBody>


                    <Row className="mb-5">
                      <ApplyChangesModal wizardState={this.props.wizardState} onShowTable={this.clkApplyButton} setDataGrid={this.setDataGrid} />
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
        console.log("aaaaaaaaaaaaaaaaaaaa2");
        console.log(this.props.wizardState.typeName);
        this.props.nextStep();
    }

//    _isComplete = (stepId) =>
//        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

export default Wiz3;

