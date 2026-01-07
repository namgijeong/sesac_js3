const TextInput = ({label, name, type='text',value, onChange}) => {
  
    return(
        <label style={{display:'grid', gap:6}}>
        <span>{label}</span>
        {/* 
        value={value}를 안했더니 
         setForm((prev) => ({...prev, pw:''}));
         를 할때 dom이 안바뀜
         */}
        <input name={name} type={type}  value={value} onChange={(e) => onChange(name, e.target.value)}/>
        </label>
    )
}

export default TextInput;