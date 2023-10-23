// react
import { useState } from "react";
// @mui
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';


export default function DynamicTextField() {
    const [fields, setFields] = useState([""]);

    const handleAddField = () => {
    setFields([...fields, ""]);
    };

    const handleRemoveField = (index: number) => {
    const filteredFields = fields.filter((_, i) => i !== index);
    setFields(filteredFields);
    };


    return(
        <>
        <p>추가 정보</p>
            {fields.map((field, index) => (
            <div key={index}>
                <TextField
                name="extraInfoAns"
                value={field}
                onChange={(e) => {
                    const updatedFields = [...fields];
                    updatedFields[index] = e.target.value;
                    setFields(updatedFields);
                }}
                />
                <IconButton onClick={() => handleRemoveField(index)}>
                <DeleteIcon />
                </IconButton>
            </div>
            ))}
            <Button variant="contained" onClick={handleAddField} sx={{ mt: 2 }}>
            정보 추가하기
            </Button>
        </>
    );
}