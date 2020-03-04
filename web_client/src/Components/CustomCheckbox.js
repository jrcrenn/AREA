import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

export default function CustomCheckbox(props) {
    return(
        <FormControlLabel
            control={
                <Checkbox name={props.name} checked={props.checked} onChange={props.onChange} value={props.value} />
            }
            label={props.label}
        />
    )
}