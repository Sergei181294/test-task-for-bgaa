import css from "./groupInfo.module.css"
import { useAppSelector } from "../../hooks/hooks";
import { getData } from "../../store/selectors";
import { getDataFromBack } from "../../store/slice";




interface CardProps {
       course: string;
       semestr: string;
       studentsNumber: string;
       groupName: string;
}

export const GroupInfo: React.FC<CardProps> = ({ course, semestr, studentsNumber, groupName }) => {

       const groupArr = ["Группа", "Количество курсантов", "Курс", "Семестр"]


       const dataArr = useAppSelector(getData)


       return (
              <div className={css.groupInfoWrapper}>
                     <div className={css.blockInfo}>
                            <p className={css.title}>Группа</p>
                            <p className={css.info}>{groupName}</p>
                     </div>
                     <div className={css.blockInfo}>
                            <p className={css.title}>Количество курсантов</p>
                            <p className={css.info}>{studentsNumber}</p>
                     </div>
                     <div className={css.blockInfo}>
                            <p className={css.title}>Курс</p>
                            <p className={css.info}>{course}</p>
                     </div>
                     <div className={css.blockInfo}>
                            <p className={css.title}>Семестр</p>
                            <p className={css.info}>{semestr}</p>
                     </div>



              </div>
       )
}