import React, {useState} from 'react';
import _ from 'lodash';

import {
    Container,
    Button,
    Row,
    Col,
    UncontrolledModal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from './../../../../components';
import {Loading} from './../src/components/LoadingComponent';
import DataStore from './../src/store/DataStore';


class ApplyChangesModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isOpen: false,
            runResults: null
        }
    }

    doApplyChangesFirst() {
      if (this.props.updateFields.length === 0) {
        this.doDryRun();
        return;
      }

      //note. are two copies of this code!
        this.setState({isLoading:true});
        const obj = {
          planId: this.props.wizardState.planId,
          fieldL: this.props.updateFields
        };
        DataStore.postWizFieldUpdate(obj)
        .then(res => {
          console.log('okstart');
          console.log(res);
            this.setState({isLoading:false});
            this.props.onPlanUpdate(res);
            this.doDryRun();
        },
        (error) => {
            this.setState({isLoading:false});
            console.log('!error');
        });
    }    
    
    doDryRun() {
        this.setState({isLoading:true});
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwiz" + this.props.wizardState.planId);
        const obj =  {
          planId: this.props.wizardState.planId,
          fullRun: false
        }
        DataStore.postWizDryRun(obj)
        .then(res => {
          console.log('got dry run data');
          console.log(res);
          this.setState({isLoading:false, runResults:res});
          //this.props.setDataGrid(res);
          this.props.onShowTable();
        },
        (error) => {
            console.log('!error');
            this.setState({isLoading:false});
        });
    }

    clkButton = () => {
        console.log('clkButton');
        this.setState({isOpen:true});
        this.doApplyChangesFirst();
    }


    render() {

    let runResult = null;
    if (this.state.runResults) {
        runResult = <div>
           Number of rows processed: {this.state.runResults.numRowsProcessed} <br/>
           Number of errors: {this.state.runResults.errors.length}
         </div>
    }    
    return (
        <React.Fragment>
          <Col>
            <Button id="modalDefault203" color="success" size="lg"  onClick={this.clkButton}>
                Apply Changes  <i className="fa fa-angle-right ml-1"></i>
            </Button>
            { /* START Example Modal */}
            <UncontrolledModal target="modalDefault203" size="lg">
                <ModalHeader tag="h5">
                    { !this.state.isLoading && 
                        <span>Results</span>
                    }
                    { this.state.isLoading && 
                        <span className="small ml-1 text-muted">
                            Processing your data..
                        </span>
                    }
                </ModalHeader>
                <ModalBody>
                    { this.state.isLoading && 
                      <Loading />
                    }
                    {runResult}
                </ModalBody>
                <ModalFooter>
                    <UncontrolledModal.Close color="primary" size="lg"> 
                        Close
                    </UncontrolledModal.Close>
                </ModalFooter>
            </UncontrolledModal>
          </Col>
        </React.Fragment>
    );
    }
}

export default ApplyChangesModal;

