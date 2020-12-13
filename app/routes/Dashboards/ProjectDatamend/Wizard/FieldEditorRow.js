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
    FormText    
} from './../../../../components';


const makeId = (name,index) => {
    return `${name}_${index}`;
}


const FieldEditorRow = ({fieldSpec, index}) => {
  const [name, setName] = React.useState(fieldSpec.name);
  const [optional, setOptional] = React.useState(fieldSpec.optionalFlag);

  return (
      <tr key={index}>
       <td>
       <CustomInput type="checkbox" id={makeId("active",index)} inline checked={fieldSpec.active}/>
       </td>
       <td>
            <Input type="text" name={makeId("name",index)} id={makeId("name",index)} 
            value={name} onChange={(e) => setName(e.target.value)}/>                              
       </td>
       <td><i>1240 Main st.</i></td>
       <td>
            <CustomInput type="checkbox" id={makeId("optional",index)} inline checked={fieldSpec.optionalFlag} 
              onChange={(e) => setOptional(e.target.checked)}/>
       </td>
       <td>
            <CustomInput type="checkbox" id={makeId("pk",index)} inline />
       </td>
       <td>
       </td>
      </tr>

  );
}

export default FieldEditorRow;

