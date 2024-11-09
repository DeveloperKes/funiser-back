import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { User } from "../User/User.entity";

export enum TokenStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    REVOKED = "revoked",
    SUSPECT = "suspect",
}

@Entity('tokens')
export class Token extends CommonEntity {
    @Column()
    refreshToken: string;

    @Column({ type: 'enum', enum: TokenStatus, default: TokenStatus.ACTIVE })
    status: TokenStatus;

    @Column()
    device: string;

    @Column({ type: 'timestamp with local time zone', default: () => 'CURRENT_TIMESTAMP' })
    lastConnection: Date;

    @ManyToOne(() => User, user => user.tokens)
    user: User
}