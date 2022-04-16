import { v4 as uuidv4 } from "uuid";

interface Props {
    label: string;
    value: string | number;
    type: string;
    name: string;
    id?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField( { label, value, type, name, id, onChange } : Props ) {

    if (!id) {
        id = `input_${label.split(' ').join('_')}-${uuidv4()}`;
    }

    return (
        <label htmlFor={id}>
            <input 
                type = {type}
                id = {id}
                value = {value}
                placeholder = {label}
                name = {name}
                onChange = {onChange}
                className = 'relative w-full h-10 pl-2.5 pr-2.5 input_field mb-1'
            />
        </label>
    )

}

export default InputField;