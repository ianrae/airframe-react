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


class ApplyChangesModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {

    return (
        <React.Fragment>
          <Col>
            <Button id="modalDefault203" color="primary" size="lg">
                Apply Changes  <i className="fa fa-angle-right ml-1"></i>
            </Button>
            { /* START Example Modal */}
            <UncontrolledModal target="modalDefault203" size="lg">
                <ModalHeader tag="h5">
                    Modal: Large Size
                    <span className="small ml-1 text-muted">
                        #2.03
                    </span>
                </ModalHeader>
                <ModalBody>
                   <Loading />
                    { "sdfsdfdsfdsfdsf sfsd sfsef ze eee" }
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

