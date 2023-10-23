import css from "./header.module.css"


export const Header = () => {
       return (
              <div className={css.headerWrapper}>
                     <h2 className={css.headerTitle}>Конкретная авиационная техника (1-37 04 02-01)</h2>
              </div>
       )
}