import React from 'react';
import _ from 'lodash';

import {
    Card,
    CardFooter,
    CardBody,
    Button,
} from './../../../../components';


const NextPrevButtons = ({isPrev, isNext, doPrev, doNext}) => (

    <CardFooter className="p-4 bt-0">
        <div className="d-flex">
            {
                isPrev() && (
                    <Button onClick={() => {doPrev()}} color="link" className='mr-3'>
                        <i className='fa fa-angle-left mr-2'></i>
                        Previous
                    </Button>
                )
            }
            {
                isNext() && (
                    <Button color='primary' onClick={() => {doNext()}} className="ml-auto px-4">
                        Next
                        <i className='fa fa-angle-right ml-2'></i>
                    </Button>
                )
            }
        </div>
    </CardFooter>
);

export default NextPrevButtons;

