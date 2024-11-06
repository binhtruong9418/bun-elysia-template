import {Page} from "./types";

export function toPageDTO<T>(findAndCount: [T[], number], page: number, limit: number): Page<T> {
    return {
        contents: findAndCount[0],
        currentPage: page,
        perPage: limit,
        totalElements: findAndCount[1],
        totalPage: Math.ceil(findAndCount[1] / limit),
    }
}

export const createUpdateData = (entity: any, body: any) => {
    Object.keys(body).forEach(key => {
      if(body[key] !== undefined && body[key] !== null) {
        entity[key] = body[key];
      }
    });
    return entity;
}