import React, { useState, useEffect } from "react";
import css from "./table.module.css";
import { ReactComponent as AddIcon } from "../../assets/addColumn.svg"
import { ReactComponent as RemoveIcon } from "../../assets/removeColumn.svg"
import { Select, Input } from "../common";
import { Card } from "../App"

interface tableProps {
       exam: boolean;
       offset: boolean;
       lecturesHours: string;
       teachersArr: [];
       laboratoryHours: string;
       practicHours: string;
       seminarHours: string;
       studentsNumber: string;
       onChange: any;
       cardIndex: number;
}

const initialTableData = [{
       laboratoryTeacher: "",
       lectureTeacher: "",
       practiceTeacher: "",
       seminarTeacher: "",
       examTeacher: "",
       offsetTeacher: "",
       countFirstGroup: "",
       countSecondGroup: "",
       count: "",
       laboratoryTeacherSecondGroup: "",
       lectureTeacherSecondGroup: "",
       practiceTeacherSecondGroup: "",
       seminarTeacherSecondGroup: "",
       examTeacherSecondGroup: "",
       offsetTeacherSecondGroup: "",
},
{
       laboratoryTeacher: "",
       lectureTeacher: "",
       practiceTeacher: "",
       seminarTeacher: "",
       examTeacher: "",
       offsetTeacher: "",
       countFirstGroup: "",
       countSecondGroup: "",
       count: "",
       laboratoryTeacherSecondGroup: "",
       lectureTeacherSecondGroup: "",
       practiceTeacherSecondGroup: "",
       seminarTeacherSecondGroup: "",
       examTeacherSecondGroup: "",
       offsetTeacherSecondGroup: "",
},
{
       laboratoryTeacher: "",
       lectureTeacher: "",
       practiceTeacher: "",
       seminarTeacher: "",
       examTeacher: "",
       offsetTeacher: "",
       countFirstGroup: "",
       countSecondGroup: "",
       count: "",
       laboratoryTeacherSecondGroup: "",
       lectureTeacherSecondGroup: "",
       practiceTeacherSecondGroup: "",
       seminarTeacherSecondGroup: "",
       examTeacherSecondGroup: "",
       offsetTeacherSecondGroup: "",
}]

export const Table: React.FC<tableProps> = ({ exam, offset, lecturesHours, teachersArr, laboratoryHours, practicHours, seminarHours, studentsNumber, onChange, cardIndex }) => {
       const [titleColumnArr, setTitleColumnArr] = useState([
              "Занятия",
              "Часы",
              "Преподаватель",
       ]);
       const [titleRowArr, setTitleRowArr] = useState([
              { name: "Лекции", hours: lecturesHours },
              { name: "Лабораторные работы", hours: laboratoryHours },
              { name: "Практические", hours: practicHours },
              { name: "Семинарские", hours: seminarHours },
              { name: exam ? "Экзамен" : null, hours: null },
              { name: offset ? "Зачет" : null, hours: null }
       ])
       const [columnCount, setColumnCount] = useState(2);





       const addColumn = () => {
              setTitleColumnArr([
                     "Занятия",
                     "Часы",
                     "Подгруппа 1",
                     "Подгруппа 2",
              ]);
              setColumnCount((prevCount) => prevCount + 1);
       };

       const [selectedTeachers, setSelectedTeachers] = useState<{ [key: string]: string }>({});
       const [input1Value, setInput1Value] = useState((Math.floor(+studentsNumber / 2)).toString());
       const [input2Value, setInput2Value] = useState((Math.ceil(+studentsNumber / 2)).toString());
       const [tableData, setTableData] = useState<Card[]>(initialTableData)

       useEffect(() => {
              onChange(tableData)
       }, tableData)

       const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>): void => {
              const newValue = event.target.value;
              setInput1Value(newValue);

              const diff = +studentsNumber - parseInt(newValue);
              const updatedValue2 = (diff >= 0) ? diff.toString() : '';

              if (parseInt(newValue) < 1 || parseInt(newValue) > 21) {
                     alert("Введите число от 1 до 21");
              } else {
                     setInput2Value(updatedValue2);
                     const updatedTableData = {
                            ...tableData[cardIndex],
                            countFirstGroup: newValue,
                            count: (+newValue + +updatedValue2).toString()
                     };
                     const newTableData = [...tableData];
                     newTableData[cardIndex] = updatedTableData;
                     setTableData(newTableData);
              }
       };
       console.log(tableData);

       const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = event.target.value;
              setInput2Value(newValue);

              const diff = +studentsNumber - parseInt(newValue);
              const updatedValue1 = (diff >= 0) ? diff.toString() : '';

              if (parseInt(newValue) < 1 || parseInt(newValue) > 21) {
                     alert("Введите число от 1 до 21");
              } else {
                     setInput1Value(updatedValue1);
                     const updatedTableData = {
                            ...tableData[cardIndex],
                            countSecondGroup: newValue
                     };
                     const newTableData = [...tableData];
                     newTableData[cardIndex] = updatedTableData;
                     setTableData(newTableData);
              }
       };



       const removeColumn = () => {
              if (columnCount > 2) {
                     setTitleColumnArr([
                            "Занятия",
                            "Часы",
                            "Преподаватель",
                     ]);

                     setColumnCount((prevCount) => prevCount - 1);
              }
       };

       function getIdFromSelectedValue(selectedValue: string) {
              const fullNameParts = selectedValue.split(' ');
              const lastName = fullNameParts[0];
              const initials = fullNameParts[1].split('.').join('');

              for (let i = 0; i < teachersArr.length; i++) {
                     const teacher = teachersArr[i];
                     //   @ts-ignore
                     const teacherFullNameParts = teacher.name.split(' ');
                     const teacherLastName = teacherFullNameParts[0];
                     const teacherInitials = teacherFullNameParts[1].split('.').join('');

                     if (teacherLastName === lastName && teacherInitials === initials) {
                            //   @ts-ignore
                            return teacher.id;
                     }
              }

              return null;
       }





       return (
              <div className={css.tableWrapper}>
                     <ul className={css.titleColumnList}>
                            {titleColumnArr.map((title, index) => (
                                   <li key={title} className={css.titleColumnElem}>
                                          {title}
                                          {index === titleColumnArr.length - 1 &&
                                                 <div>
                                                        {columnCount === 2 ?
                                                               <AddIcon className={css.addIcon} onClick={addColumn} />
                                                               : <RemoveIcon className={css.removeIcon} onClick={removeColumn} />}
                                                 </div>
                                          }
                                   </li>
                            ))}
                     </ul>
                     <div>

                            {titleRowArr
                                   .filter((item) => item.name !== null)
                                   .map((rowObj, rowIndex) => (

                                          <ul className={css.titleRowList} key={rowObj.name}>
                                                 {titleColumnArr
                                                        .map((name, columnIndex) => (
                                                               <li key={name}>
                                                                      {name === "Занятия" ? rowObj.name : name === "Часы" ? rowObj.hours
                                                                             : <Select
                                                                                    key={`${rowIndex}-${columnIndex}`}
                                                                                    rowName={rowObj.name ? rowObj.name : ""}
                                                                                    columnName={name}
                                                                                    hours={rowObj.hours ? rowObj.hours : ""}
                                                                                    teachersArr={teachersArr}
                                                                                    selectedTeacher={selectedTeachers[`${rowIndex}-${columnIndex}`]}
                                                                                    setSelectedTeacher={(selectedValue: string, numberOfColumn: number) => {

                                                                                           setSelectedTeachers((prevSelectedTeachers) => ({
                                                                                                  ...prevSelectedTeachers,
                                                                                                  [`${rowIndex}-${columnIndex}`]: selectedValue,
                                                                                           }));
                                                                                           const id = getIdFromSelectedValue(selectedValue)
                                                                                           if (numberOfColumn) {
                                                                                                  setSelectedTeachers((prevSelectedTeachers) => ({
                                                                                                         ...prevSelectedTeachers,
                                                                                                         [`${0}-${numberOfColumn}`]: selectedValue,
                                                                                                         [`${1}-${numberOfColumn}`]: selectedValue,
                                                                                                         [`${2}-${numberOfColumn}`]: selectedValue,
                                                                                                         [`${3}-${numberOfColumn}`]: selectedValue,
                                                                                                         [`${4}-${numberOfColumn}`]: selectedValue,
                                                                                                         [`${5}-${numberOfColumn}`]: selectedValue,
                                                                                                  }))
                                                                                                  if (numberOfColumn === 2) {
                                                                                                         const updatedData = [...tableData];
                                                                                                         updatedData[cardIndex].lectureTeacher = id;
                                                                                                         updatedData[cardIndex].laboratoryTeacher = id;
                                                                                                         updatedData[cardIndex].practiceTeacher = id;
                                                                                                         updatedData[cardIndex].seminarTeacher = id;
                                                                                                         updatedData[cardIndex].examTeacher = id;
                                                                                                         updatedData[cardIndex].offsetTeacher = id;
                                                                                                         setTableData(updatedData);
                                                                                                  } else {
                                                                                                         const updatedData = [...tableData];
                                                                                                         updatedData[cardIndex].lectureTeacherSecondGroup = id;
                                                                                                         updatedData[cardIndex].laboratoryTeacherSecondGroup = id;
                                                                                                         updatedData[cardIndex].practiceTeacherSecondGroup = id;
                                                                                                         updatedData[cardIndex].seminarTeacherSecondGroup = id;
                                                                                                         updatedData[cardIndex].examTeacherSecondGroup = id;
                                                                                                         updatedData[cardIndex].offsetTeacherSecondGroup = id;
                                                                                                         setTableData(updatedData);
                                                                                                  }

                                                                                           }

                                                                                           if (`${rowIndex}-${columnIndex}` === "0-2") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].lectureTeacher = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "1-2") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].laboratoryTeacher = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "2-2") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].practiceTeacher = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "3-2") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].seminarTeacher = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "4-2") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].examTeacher = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "5-2") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].offsetTeacher = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "0-3") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].lectureTeacherSecondGroup = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "1-3") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].laboratoryTeacherSecondGroup = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "2-3") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].practiceTeacherSecondGroup = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "3-3") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].seminarTeacherSecondGroup = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "4-3") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].examTeacherSecondGroup = id;
                                                                                                  setTableData(updatedData);
                                                                                           } else if (`${rowIndex}-${columnIndex}` === "5-3") {
                                                                                                  const updatedData = [...tableData];
                                                                                                  updatedData[cardIndex].offsetTeacherSecondGroup = id;
                                                                                                  setTableData(updatedData);
                                                                                           }






                                                                                    }}
                                                                                    firstTeacherforFirstCol={selectedTeachers[`${0}-${2}`]}
                                                                                    firstTeacherforSecondCol={selectedTeachers[`${0}-${3}`]}
                                                                             />}
                                                               </li>

                                                        ))}

                                          </ul>
                                   ))
                            }
                            {columnCount === 3 && (
                                   <ul className={css.titleRowList}>
                                          <li>Количество курсантов</li>
                                          <li></li>
                                          <li>
                                                 <Input

                                                        className={css.countOfStudents}
                                                        type="text"
                                                        id="input1"
                                                        value={input1Value}
                                                        onChange={handleInputChange1}
                                                 />
                                          </li>

                                          <li>
                                                 <Input
                                                        className={css.countOfStudents}
                                                        type="text"
                                                        id="input2"
                                                        value={input2Value}
                                                        onChange={handleInputChange2} />
                                          </li>
                                   </ul>
                            )}
                            <ul className={columnCount === 2 ? css.titleRowList : css.titleRowListForFour}>
                                   <li>Примечание (для составления расписания)</li>
                                   <li></li>
                                   <li className={css.fieldForNotice}><textarea className={css.elemForField}></textarea></li>
                            </ul>
                     </div>

              </div>

       );
}