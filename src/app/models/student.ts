import { Parent } from './parent';

export interface Student {
    StudentId: number;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    Patrimonial: string;
    GroupId: number;
    GroupName: string;
    Parents: Parent[];
}
