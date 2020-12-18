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
  const [type, setType] = React.useState(fieldSpec.typeName);
  const [optional, setOptional] = React.useState(fieldSpec.optionalFlag);
  const [isPK, setIsPK] = React.useState(fieldSpec.isPK);

  const onSetName = (s) => {
    setName(s);
    let spec = doOnChangeField();
    spec.outputName = s;
    onChangeField(spec);
  }
  const onSetType = (s) => {
    setType(s);
    let spec = doOnChangeField();
    spec.typeName = s;
    onChangeField(spec);
  }
  const onSetOptional = (flag) => {
    setOptional(flag);
    let spec = doOnChangeField();
    spec.optionalFlag = flag;
    onChangeField(spec);
  }
  const onSetIsPK = (flag) => {
    setIsPK(flag);
    let spec = doOnChangeField();
    spec.isPK = flag;
    onChangeField(spec);
  }
  const onOnSelFlag = (index,flag) => {
    onSelFlag(index, flag);
    let spec = doOnChangeField();
    spec.active = flag;
    onChangeField(spec);
  }
  const doOnChangeField = () => {
    let spec = {...fieldSpec};
    spec.outputName = name;
    spec.optionalFlag = optional;
    spec.isPK = isPK;
    spec.typeName = type;
    spec.active = selectFlag;
    //onChangeField(spec);
    return spec;
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
       <td>
          <Input 
              type="select" 
              name="select" 
              id="defaultSelect" 
              value={type}
              onChange={(e) => onSetType(e.target.value)}
          >
              <option defaultValue="">string</option>
              <option>int</option>
              <option>long</option>
              <option>number</option>
              <option>boolean</option>
              <option>date</option>
          </Input>
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

