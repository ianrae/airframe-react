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


class FullRunModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isOpen: false,
            runResults: null
        }
    }
    
    doFullRun() {
        this.setState({isLoading:true});
        console.log("wiz" + this.props.wizardState.planId + ", " + this.props.inputType);
        const obj =  {
          planId: this.props.wizardState.planId,
          fullRun: true,
          outputType: this.props.inputType //json,xml,sql,delia,plain
        }
        DataStore.postWizDryRun(obj)
        .then(res => {
          console.log('got dry run');
          console.log(res);
          this.setState({isLoading:false, runResults:res});
          this.props.setDataGrid(res);
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
        this.doFullRun();
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
            <Button id="modalDefault204" color="success" size="lg"  onClick={this.clkButton}>
                Run  &nbsp;&nbsp; <i className="fa fa-angle-right ml-1"></i>
            </Button>
            { /* START Example Modal */}
            <UncontrolledModal target="modalDefault204" size="lg">
                <ModalHeader tag="h5">
                    { !this.state.isLoading && 
                        <span>Run Finished</span>
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
                    <Row>&nbsp;</Row>
                    <Row>
                    { !this.state.isLoading && 
                        <Col lg={ 9 }>
                            <div className="alert alert-info" role="alert">
                              Success! &nbsp;&nbsp; Press Close to see the output data.
                            </div>
                        </Col>
                    }
                    </Row>
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

export default FullRunModal;

