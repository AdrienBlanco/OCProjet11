export default function InputWrapper({ label, type, id, autoComplete, onChange, value, placeholder, disabled}) {
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} autoComplete={autoComplete} onChange={onChange} value={value} placeholder={placeholder} disabled={disabled}/>
        </div>
    )
};