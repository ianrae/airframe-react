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


const sortCaret = (order) => {
    if (!order)
        return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order)
        return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>
}

export class AdvancedTableAIan extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
        if (this.props.hdrList === undefined || this.props.hdrList.length === 0) {
            return [{
                dataField: 'aaa',
                text: 'aaaa',
                headerFormatter: column => (
                    <React.Fragment>
                        <span className="text-nowrap">{ column.text }</span>
                    </React.Fragment>
                )
            }];
        }

        console.log('colxx:' + this.props.hdrList.length);

        return this.props.hdrList.map((colName,i) => {
            return {
                dataField: colName,
                text: colName,
                sort: true,
                sortCaret
            }
        });
    }

    render() {
        const columnDefs = this.createColumnDefinitions();
        const paginationDef = paginationFactory({
            paginationSize: 5,
            showTotal: true,
            totalSize: this.props.totalRows,
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

        if (this.props.tblRows.length === 0) {
            console.log('no rows');
            return (
                <h5>sdfdf no rows</h5>
                );
        } else return (
            <ToolkitProvider
                keyField="id"
                data={ this.props.tblRows }
                columns={ columnDefs }
                search
                exportCSV
            >
            {
                props => (
                    <React.Fragment>
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <h6 className="my-0">
                            </h6>
                            <div className="d-flex ml-auto">
                                <CustomSearch
                                    className="mr-2"
                                    { ...props.searchProps }
                                />
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