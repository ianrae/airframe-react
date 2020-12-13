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
  const [selected, setSelected] = React.useState(fieldSpec.active);
  const [name, setName] = React.useState(fieldSpec.name);
  const [optional, setOptional] = React.useState(fieldSpec.optionalFlag);
  const [isPK, setIsPK] = React.useState(fieldSpec.isPK);

  const mySel = (flag) => {
    console.log("ssss");
    console.log(flag);
    setSelected(flag);
  }

  return (
      <tr key={index}>
       <td>
         <CustomInput type="checkbox" id={makeId("active",index)} inline checked={selected}
            onChange={(e) => mySel(e.target.checked)} />                              
       </td>
       <td>
            <Input type="text" name={makeId("name",index)} id={makeId("name",index)} disabled={!selected}
            value={name} onChange={(e) => setName(e.target.value)}/>                              
       </td>
       <td><i>1240 Main st.</i></td>
       <td>
            <CustomInput type="checkbox" id={makeId("optional",index)} inline checked={optional} disabled={!selected} 
              onChange={(e) => setOptional(e.target.checked)} />
       </td>
       <td>
            <CustomInput type="checkbox" id={makeId("pk",index)} inline checked={isPK} disabled={!selected}
             onChange={(e) => setIsPK(e.target.checked)} />
       </td>
       <td>
       </td>
      </tr>

  );
}

export default FieldEditorRow;

