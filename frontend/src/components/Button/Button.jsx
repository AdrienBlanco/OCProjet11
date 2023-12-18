export default function Button({ className, type, onClick, txt }) {
    return (
        <button className={className} type={type} onClick={onClick}>{txt}</button>
    )
};