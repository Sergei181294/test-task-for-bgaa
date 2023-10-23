import { Card } from "./Card/Card"
import { getData, getTeachers } from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react"
import { getDataFromBack } from "../store/slice";
import css from "./app.module.css"
import { Button } from "./common";
import { postData } from "../api"

export interface Card {
  laboratoryTeacher?: string;
  lectureTeacher?: string;
  practiceTeacher?: string;
  seminarTeacher?: string;
  examTeacher?: string;
  offsetTeacher?: string;
  countFirstGroup?: string;
  countSecondGroup?: string;
  count?: string;
  laboratoryTeacherSecondGroup: string,
  lectureTeacherSecondGroup: string,
  practiceTeacherSecondGroup: string,
  seminarTeacherSecondGroup: string,
  examTeacherSecondGroup: string,
  offsetTeacherSecondGroup: string,
}

export const App = () => {

  const [data, setData] = useState([])

  const handleSubmit = (): void => {
    postData(data)
  };
  const dataArr = useAppSelector(getData)
  const teachersArr = useAppSelector(getTeachers)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDataFromBack())
  }, [])

  const handleChange = (tableData: any) => {
    setData({ ...data, ...tableData })
  }


  return (
    <>
      <div className={css.appWrapper}>
        {dataArr.map((data: any, cardIndex: number) => (
          <Card
            key={data.uniqueId}
            course={data.course}
            semestr={data.semestr}
            studentsNumber={data.studentsNumber}
            groupName={data.groupName}
            exam={data.exam}
            offset={data.offset}
            teachersArr={teachersArr}
            lecturesHours={data.lecturesHours}
            laboratoryHours={data.laboratoryHours}
            practicHours={data.practicHours}
            seminarHours={data.seminarHours}
            onChange={handleChange}
            cardIndex={cardIndex}
          />

        ))}

      </div>
      <Button onClick={handleSubmit}>Отправить</Button>
    </>
  );
}


