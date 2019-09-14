import { Instructor } from './instructor';

export interface GroupInstructor {
    GroupId: number;
    InstructorId: number;
    Salary: number;
    Type: string;    
    Instructor: Instructor;
}
