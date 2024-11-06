import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import {AppRole} from "../types";
import {DateEntity} from "./Date/DateEntity";

type RelationWrapper<T> = T;

@Entity()
class User extends DateEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({
        type: 'enum',
        enum: AppRole,
        default: AppRole.USER
    })
    role!: AppRole

    @Column({
        nullable: true
    })
    name!: string

    @Column({
        nullable: true
    })
    phone!: string

    @Column({
        nullable: true
    })
    address!: string
}

export default User
