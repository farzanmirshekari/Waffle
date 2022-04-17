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
        <label htmlFor={id} className = 'relative w-full flex justify-center items-center'>
            <input 
                type = {type}
                id = {id}
                value = {value}
                placeholder = {label}
                name = {name}
                onChange = {onChange}
                className = 'input_field bold relative w-8/12 h-10 pl-2.5 pr-2.5 mb-5'
            />
        </label>
    )

}

export default InputField;