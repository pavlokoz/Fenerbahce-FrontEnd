import { Role } from './models/role';
import { SalaryType } from './models/salary-type';
import { PaymentType } from './models/payment-type';
import { EventFrequency } from './models/event-frequency';

export class Constants {
    static CurrentBackEndHost: string = 'http://localhost:56833/';
    
    //Constants for AuthorizationService
    static readonly AuthorizationServiceConstants = class {

        static readonly UrlForAuthorization: string = Constants.CurrentBackEndHost + 'Token';

        static readonly UrlForRegistration: string = Constants.CurrentBackEndHost + 'api/Account/RegisterOfUser';
    }

    //Constants for data validation
    static readonly DataValidationConstants = class {

        static readonly NamePattern: string = "^[а-яА-ЯёЁa-zA-Zʼ'ї Ї і І є Є-]{2,40}$";

        static readonly PasswordPattern: string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})';

        static readonly EmailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$';
        
        static readonly MaxCountOfStudents: string;
        
        static readonly pricePattern: string;
    }    

    static readonly InstuctorConstants = class {
        static readonly SalaryTypes: SalaryType[] = [
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

    static readonly PaymentConstants = class {
        static readonly PaymentTypes: PaymentType[] = [
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

    static readonly EventConstants = class {
        static readonly EventFrequencies: EventFrequency[] = [
            {
                FrequencyId: 0,
                Description: 'None'
            },
            {
                FrequencyId: 1,
                Description: 'Weekly'
            },
            {
                FrequencyId: 2,
                Description: 'Monthly'
            }
         ];
    }

    static readonly RegistrationConstants = class {
        static readonly UserRoles: Role[] = [
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
         static readonly GrantType: string = 'grant_type=password';
         static readonly Email: string = 'Email=';
         static readonly Password: string = 'Password=';
    }
}