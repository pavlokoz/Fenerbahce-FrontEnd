import { Student } from './student';
import { GroupInstructor } from './group-instructor';

export interface Group {
    GroupId: number;
    GroupName: string;
    SchoolId: number;
    SchoolName: string;
    SportId: number;
    SportName: string;
    Students: Student[];
    GroupInstructors: GroupInstructor[];
}
