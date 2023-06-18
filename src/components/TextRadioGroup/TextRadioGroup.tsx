import styles from './TextRadioGroup.module.css';

export function TextRadioGroup(props: any) {

  return (
    <>
      {props.options.map((opt: any, index: number) => {
        return (
          <label key={index} className={styles.container}>
            <input type="radio" name={opt.value} checked={opt.value === props.selected} onChange={props.onchange}/>
            <span className={styles.checkmark}>{opt.title}</span>
          </label>
        )
      })}
    </>
  )
}