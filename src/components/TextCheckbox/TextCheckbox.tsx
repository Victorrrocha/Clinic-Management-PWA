import styles from './TextCheckbox.module.css'

export function TextCheckbox(props: any) {

  return (
    <label className={styles.container}>
      <input type="checkbox" name={props.title} checked={props.checked} onChange={props.onchange}/>
      <span className={styles.checkmark}>{props.title}</span>
    </label>
  )
}