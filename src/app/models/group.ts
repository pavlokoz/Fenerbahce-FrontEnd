import { Student } from './student';

export interface Group {
    GroupId: number;
    GroupName: string;
    MaxCountOfStudents: number;
    StartDate: Date;
    EndDate: Date;
    MonthPrice: number;
    SubjectId: number;
    SubjectName: string;
    Students: Student[]; 
}
