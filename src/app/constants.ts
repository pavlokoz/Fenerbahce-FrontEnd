import { Role } from './models/role';
import { SalaryType } from './models/salary-type';
import { PaymentType } from './models/payment-type';

export class Constants {
    static CurrentBackEndHost: string = 'http://6547360.online-server.cloud/FenerbahceBackEnd/';
    
    //Constants for AuthorizationService
    static AuthorizationServiceConstants = class {

        static UrlForAuthorization: string = Constants.CurrentBackEndHost + 'Token';

        static UrlForRegistration: string = Constants.CurrentBackEndHost + 'api/Account/RegisterOfUser';
    }

    //Constants for data validation
    static DataValidationConstants = class {

        static NamePattern: string = "^[а-яА-ЯёЁa-zA-Zʼ'ї Ї і І є Є-]{2,40}$";

        static PasswordPattern: string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})';

        static EmailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$';
        
        static MaxCountOfStudents: string;
        
        static pricePattern: string;
    }    

    static InstuctorConstants = class {
        static SalaryTypes: SalaryType[] = [
            {
                TypeCode: 'M',
                TypeDescription: 'Monthly'
            },
            {
                TypeCode: 'L',
                TypeDescription: 'Per Lesson'
            }
         ];
    }

    static PaymentConstants = class {
        static PaymentTypes: PaymentType[] = [
            {
                TypeCode: 'M',
                TypeDescription: 'Monthly payments'
            },
            {
                TypeCode: 'F',
                TypeDescription: 'Fenerium'
            },
            {
                TypeCode: 'E',
                TypeDescription: 'Extra'
            }
         ];
    }

    static RegistrationConstants = class {
        static UserRoles: Role[] = [
            {
                RoleId: 1,
                RoleDescription: 'Director' 
            },
            {
                RoleId: 2,
                RoleDescription: 'Accountant' 
            },
            {
                RoleId: 3,
                RoleDescription: 'Instructor' 
            },
            {
                RoleId: 4,
                RoleDescription: 'Parent' 
            }

         ];
         static GrantType: string = 'grant_type=password';
         static Email: string = 'Email=';
         static Password: string = 'Password=';
         static ConfirmPassword: string = 'ConfirmPassword=';
         static FirstName: string = 'FirstName=';         
         static LastName: string = 'LastName=';
         static Role: string = 'Role=';
         static DateOfBirth: string = 'DateOfBirth=';
    }
}