import style from './FormInput.module.css'

export function FormInput(props: any) {

  return (
    <label >
      <input className={style.formInput} placeholder={props.placeholder} 
      name={props.name} value={props.value} onChange={props.onchange} type={props.type ?? "text"}/>
    </label>
  )
}