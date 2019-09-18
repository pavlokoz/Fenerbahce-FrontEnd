import { Parent } from './parent';
import { Payment } from './payment';

export interface Student {
    StudentId: number;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    Patrimonial: string;
    GroupId: number;
    GroupName: string;
    Parents: Parent[];
    Payments: Payment[];
}
