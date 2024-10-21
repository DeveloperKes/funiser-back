export interface UserInfo {
    id_person: string;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    secondaryphone: string;
    role: string;
    document: string;
}

export interface userSearchFilters {
    id_person: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: { email: string };
    }
}

export interface updateUserData {
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    phonenumber?: string;
    secundaryphone?: string;
}

export interface ProfessionalData {
    professional_id: string;
    contract_number: string;
    specialty: string;
    horary: string;
}

export interface ChildData {
    id_child: string;
    firstname: string;
    lastname: string;
    gender: string;
    birthday: Date;
    status: string;
    eps_id: number;
    family_id?: string;
    family_type?: number;
    members_data?: FamilyMemberData[];
}

export interface ChildSearchFilters {
    id_child?: string;
    firstname?: string;
    lastname?: string;
    gender?: string;
    birthday?: Date;
    status?: string;
    eps_id?: number;
    family_id?: string;
    family_type?: number;
    members_data?: FamilyMemberData[];
}

export interface FamilyData {
    family_id?: number;
    family_type?: number;
    members_data?: FamilyMemberData[];
}

export interface FamilyMemberData {
    firstname: string;
    lastname: string;
    relation: string;
    id_attendant?: string;
}

export interface epsData {
    id?: number;
}

export interface epsSearchFilters {
    id?: number;
    name?: string;
}
