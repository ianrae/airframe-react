import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { Comparator, dateFilter } from 'react-bootstrap-table2-filter'
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import _ from 'lodash';
import faker from 'faker/locale/en_US';
import moment from 'moment';

import {
    Badge,
    Button,
    CustomInput,
    StarRating,
    ButtonGroup
} from './../../../../../components';
import { CustomExportCSV } from './CustomExportButton';
import { CustomSearch } from './CustomSearch';
import { CustomPaginationPanel } from './CustomPaginationPanel';
import { CustomSizePerPageButton } from './CustomSizePerPageButton';
import { CustomPaginationTotal } from './CustomPaginationTotal';
import { randomArray } from './../../../../../utilities';

//const INITIAL_PRODUCTS_COUNT = 500;

const sortCaret = (order) => {
    if (!order)
        return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order)
        return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>
}

const generateRows = (wizardState) => {
    return wizardState.allFields.map((dish, i) => {
        return { id: i, name: 'bob'};
    });
}

export class AdvancedTableAIan extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            products: generateRows(this.props.wizardState),
            selected: []
        };

        this.headerCheckboxRef = React.createRef();
    }

    handleSelect(row, isSelected) {
        if (isSelected) {
            this.setState({ selected: [...this.state.selected, row.id] })
        } else {
            this.setState({
                selected: this.state.selected.filter(itemId => itemId !== row.id)
            })
        }
    }

    handleSelectAll(isSelected, rows) {
        if (isSelected) {
            this.setState({ selected: _.map(rows, 'id') })
        } else {
            this.setState({ selected: [] });
        }
    }


    createColumnDefinitions() {
        return [{
            dataField: 'id',
            text: 'Product IDx',
            headerFormatter: column => (
                <React.Fragment>
                    <span className="text-nowrap">{ column.text }</span>
                </React.Fragment>
            )
        }, {
            dataField: 'name',
            text: 'Product Namex',
            sort: true,
            sortCaret,
            formatter: (cell) => (
                <span className="text-inverse">
                    { cell }
                </span>
            )
        }
        ]; 
    }

    render() {
        const columnDefs = this.createColumnDefinitions();
        const paginationDef = paginationFactory({
            paginationSize: 5,
            showTotal: true,
            pageListRenderer: (props) => (
                <CustomPaginationPanel { ...props } size="sm" className="ml-md-auto mt-2 mt-md-0" />
            ),
            sizePerPageRenderer: (props) => (
                <CustomSizePerPageButton { ...props } />
            ),
            paginationTotalRenderer: (from, to, size) => (
                <CustomPaginationTotal { ...{ from, to, size } } />
            )
        });
        const selectRowConfig = {
            mode: 'checkbox',
            selected: this.state.selected,
            onSelect: this.handleSelect.bind(this),
            onSelectAll: this.handleSelectAll.bind(this),
            selectionRenderer: ({ mode, checked, disabled }) => (
                <CustomInput id="a11" type={ mode } checked={ checked } disabled={ disabled } />
            ),
            selectionHeaderRenderer: ({ mode, checked, indeterminate }) => (
                <CustomInput id="a12" type={ mode } checked={ checked } innerRef={el => el && (el.indeterminate = indeterminate)} />
            )
        };

        return (
            <ToolkitProvider
                keyField="id"
                data={ this.state.products }
                columns={ columnDefs }
                search
                exportCSV
            >
            {
                props => (
                    <React.Fragment>
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <h6 className="my-0">
                                AdvancedTablex
                            </h6>
                            <div className="d-flex ml-auto">
                                <CustomSearch
                                    className="mr-2"
                                    { ...props.searchProps }
                                />
                                <ButtonGroup>
                                    <CustomExportCSV
                                        { ...props.csvProps }
                                    >
                                        Export
                                    </CustomExportCSV>
                                </ButtonGroup>
                            </div>
                        </div>
                        <BootstrapTable
                            classes="table-responsive"
                            pagination={ paginationDef }
                            filter={ filterFactory() }
                            selectRow={ selectRowConfig }
                            bordered={ false }
                            responsive
                            { ...props.baseProps }
                        />
                    </React.Fragment>
                )
            }
            </ToolkitProvider>
        );
    }
}