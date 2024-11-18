import { Role } from "src/repositories";

// export interface UserResponseDTO {
//     id: string;
//     document: string;
//     firstname: string;
//     lastname: string;
//     phone: string;
//     username: string;
//     email: string;
//     role: Role[];
// }

export class UserResponseDTO {
    id: string;
    document: string;
    firstname: string;
    lastname: string;
    phone: string;
    username: string;
    email: string;

    constructor(partial: Partial<UserResponseDTO>) {
        Object.assign(this, partial);
    }
}