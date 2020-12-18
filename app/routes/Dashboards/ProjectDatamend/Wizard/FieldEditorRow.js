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

const FieldEditorRow = ({fieldSpec, index, selectFlag, onSelFlag, hasSecretPK, onChangeField}) => {
//  const [selected, setSelected] = React.useState(selectFlag);
  const [name, setName] = React.useState(fieldSpec.name);
  const [optional, setOptional] = React.useState(fieldSpec.optionalFlag);
  const [isPK, setIsPK] = React.useState(fieldSpec.isPK);

  const onSetName = (s) => {
    setName(s);
    doOnChangeField();
  }
  const onSetOptional = (flag) => {
    setOptional(flag);
    doOnChangeField();
  }
  const onSetIsPK = (flag) => {
    setIsPK(flag);
    doOnChangeField();
  }
  const onOnSelFlag = (index,flag) => {
    onSelFlag(index, flag);
    doOnChangeField();
  }
  const doOnChangeField = () => {
    let spec = {...fieldSpec};
    spec.outputName = name;
    spec.optionalFlag = optional;
    spec.isPK = isPK;
    spec.active = selectFlag;
    onChangeField(spec);
  }

  return (
      <tr key={index} className={selectFlag ? "" : "table-active"}>
       <td>
         <CustomInput type="checkbox" id={makeId("active",index)} inline checked={selectFlag}
            onChange={(e) => onOnSelFlag(index, e.target.checked)} />                              
       </td>
       <td>
            <Input type="text" name={makeId("name",index)} id={makeId("name",index)} disabled={!selectFlag}
            value={name} onChange={(e) => onSetName(e.target.value)}/>                              
       </td>
       <td><i>1240 Main st.</i></td>

       <td>
            <CustomInput type="checkbox" id={makeId("optional",index)} inline checked={optional} disabled={!selectFlag} 
              onChange={(e) => onSetOptional(e.target.checked)} />
       </td>
       {!hasSecretPK &&
         <td>
              <CustomInput type="checkbox" id={makeId("pk",index)} inline checked={isPK} disabled={!selectFlag}
               onChange={(e) => onSetIsPK(e.target.checked)} />
         </td>
       }
       <td>
       </td>
      </tr>

  );
}

export default FieldEditorRow;

