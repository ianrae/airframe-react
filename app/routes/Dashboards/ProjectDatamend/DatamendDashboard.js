import React from 'react';
import faker from 'faker/locale/en_US';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Card,
    CardBody,
    Badge,
    Table,
    CardTitle,
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
    ListGroup,
    ListGroupItem,
    Media,
    Col
} from './../../../components';
import { setupPage } from './../../../components/Layout/setupPage';

import { HeaderMain } from "../../components/HeaderMain";

import {
    TasksMedia
} from "../../components/DatamendDashboards/TasksMedia";
import {
    TinyDonutChart
} from "../../components/DatamendDashboards/TinyDonutChart"
import {
    TinyDonutChartAllProjects
} from "../../components/DatamendDashboards/TinyDonutChartAllProjects"
import {
    TimelineMini
} from "../../components/Timeline/TimelineMini"
import { DraggableProjects } from './DraggableProjects';

const DatamendDashboard = () => (
    <Container>
        <Row className="mb-5">
            <Col lg={ 12 }>
                <HeaderMain 
                    title="Paste some CSV data"
                    className="mb-4 mb-lg-5"
                />
                <p>
                    { 'asdfs' }
                </p>
                
            </Col>
        </Row>
        <Row>
        </Row>
    </Container>
);

export default setupPage({
    pageTitle: 'Datamend Dashboard'
})(DatamendDashboard);