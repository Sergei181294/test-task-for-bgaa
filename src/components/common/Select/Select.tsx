import React, { ChangeEvent, useState, useEffect } from "react";
import css from "./select.module.css"

import { ReactComponent as ArrowIcon } from "../../../assets/arrowDown.svg"



interface SelectProps {
       teachersArr: [];
       hours: string;
       columnName: string;
       rowName: string;
       selectedTeacher: string;
       setSelectedTeacher: any;
       firstTeacherforFirstCol: string;
       firstTeacherforSecondCol: string;
}

interface TeacherProps {
       id: string;
       name: string;
}



export const Select: React.FC<SelectProps> = ({ teachersArr, hours, columnName, rowName, selectedTeacher, setSelectedTeacher, firstTeacherforFirstCol, firstTeacherforSecondCol }) => {


       const formatFullName = (fullName: string) => {
              const nameParts = fullName.split(" ");
              const lastName = nameParts[0];
              const firstName = nameParts[1][0];
              const middleName = nameParts[2][0];

              return `${lastName} ${firstName}. ${middleName}.`;
       }

       const selectForFirstColumn = ["Преподаватель", "Подгруппа 1"].includes(columnName) && rowName === "Лекции"
       const selectForSecondColumn = ["Подгруппа 2"].includes(columnName) && rowName === "Лекции"



       const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
              const selectedValue = event.target.value;
              setSelectedTeacher(selectedValue);
       };
       
       const handleChangeTeacher = (numberOfColumn: number) => {
              numberOfColumn === 2 ?
              setSelectedTeacher(firstTeacherforFirstCol, numberOfColumn)
              :
              setSelectedTeacher(firstTeacherforSecondCol, numberOfColumn)

       }
       

       return (
              <div className={css.selectWrapper}>
                     <select
                            disabled={hours === "0"}
                            value={hours === "0" ? "Вакансия" : selectedTeacher}
                            onChange={handleChange}
                            className={selectForFirstColumn || selectForSecondColumn ? css.selectWithButton : ""}
                     >
                            <option value="Вакансия">Вакансия</option>
                            {teachersArr.map((teacher: TeacherProps) => (
                                   <option key={teacher.id} value={teacher.name}>
                                          {formatFullName(teacher.name)}
                                   </option>
                            ))}
                     </select>
                     {selectForFirstColumn && <ArrowIcon className={css.arrowIcon} onClick={() => handleChangeTeacher(2)} />}
                     {selectForSecondColumn && <ArrowIcon className={css.arrowIcon} onClick={() => handleChangeTeacher(3)} />}

              </div>

       );
}