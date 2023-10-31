// react
import { useEffect, useState } from "react";
// @mui
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';

interface DynamicTextFieldProps {
    onUpdateExtraInfo: (newExtraInfo: string) => void;
}

export default function DynamicTextField({ onUpdateExtraInfo }: DynamicTextFieldProps) {
    const [fields, setFields] = useState([""]);

    const handleAddField = () => {
        setFields([...fields, ""]);
    };

    const handleRemoveField = (index: number) => {
        const filteredFields = fields.filter((_, i) => i !== index);
        setFields(filteredFields);
    };

    useEffect(() => {
        onUpdateExtraInfo(fields.join(', '));
    }, [fields, onUpdateExtraInfo]);


    return(
        <>
        <Button size="small" variant="outlined" color="primary" onClick={handleAddField} sx={{ mt: 1, mb: 1 }}>
            추가 정보 더 등록하기
        </Button>
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
                sx={{mt: 1}}
                />
                <IconButton onClick={() => handleRemoveField(index)} color="primary">
                <DeleteIcon />
                </IconButton>
            </div>
            ))}
        </>
    );
}