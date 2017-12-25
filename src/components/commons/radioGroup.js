import React from 'react';
import { RadioButtonGroup} from 'material-ui/RadioButton';

const EcRadioGroup = ({input, ...rest}) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

export default EcRadioGroup;
