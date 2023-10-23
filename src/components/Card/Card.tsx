import { Header } from "../Header/Header"
import { GroupInfo } from "../GroupInfo/GroupInfo"
import css from "./card.module.css"
import { Table } from "../Table/Table"


interface CardProps {
       course: string;
       semestr: string;
       studentsNumber: string;
       groupName: string;
       exam: boolean;
       offset: boolean;
       teachersArr: [];
       lecturesHours: string;
       laboratoryHours: string;
       practicHours: string;
       seminarHours: string;
       onChange:any;
       cardIndex: number;
}

export const Card: React.FC<CardProps> = ({ cardIndex, course, semestr, studentsNumber, groupName, exam, offset, lecturesHours, teachersArr, laboratoryHours, practicHours, seminarHours, onChange }) => {
       return (
              <div className={css.cardWrapper}>
                     <Header />
                     <GroupInfo
                            course={course}
                            semestr={semestr}
                            studentsNumber={studentsNumber}
                            groupName={groupName}
                     />
                     <Table
                            exam={exam}
                            offset={offset}
                            lecturesHours={lecturesHours}
                            teachersArr={teachersArr}
                            laboratoryHours={laboratoryHours}
                            practicHours={practicHours}
                            seminarHours={seminarHours}
                            studentsNumber={studentsNumber}
                            onChange={onChange}
                            cardIndex={cardIndex}
                     />
              </div>
       )
}