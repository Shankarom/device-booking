import { Field as FormikField } from 'formik';

const CustomField = ({
    label='',
    name='',
    type='',
    className='',
    isRequired=false,
    placeholder = '',
    value='',
    onChange=()=>{}
}) => {
    return (
        <div>
            <label htmlFor={name} className="block md-2 text-sm font-medium">{label}</label>
            <FormikField 
                type={type} 
                id={name} 
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
                placeholder={placeholder} 
                required ={isRequired} 
                value={value} 
                onChange={onChange}
                name={name} // make sure to pass name to Formik's Field
            />
        </div>
    )
}

export default CustomField
