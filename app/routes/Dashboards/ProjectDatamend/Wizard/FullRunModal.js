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
            isOpen: false
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
          this.setState({isLoading:false});
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
    return (
        <React.Fragment>
          <Col>
            <Button id="modalDefault204" color="primary" size="lg"  onClick={this.clkButton}>
                Run  <i className="fa fa-angle-right ml-1"></i>
            </Button>
            { /* START Example Modal */}
            <UncontrolledModal target="modalDefault204" size="lg">
                <ModalHeader tag="h5">
                    Modal: Large Size
                    <span className="small ml-1 text-muted">
                        #2.03
                    </span>
                </ModalHeader>
                <ModalBody>
                    { this.state.isLoading && 
                      <Loading />
                    }
                    { "Do full run" }
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

