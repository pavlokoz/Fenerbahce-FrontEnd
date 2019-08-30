import { Student } from './student';
import { Instructor } from './instructor';

export interface Group {
    GroupId: number;
    GroupName: string;
    SchoolId: number;
    SchoolName: string;
    SportId: number;
    SportName: string;
    Students: Student[];
    Insturctors: Instructor[];
}
