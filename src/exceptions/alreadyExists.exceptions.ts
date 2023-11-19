import { BadRequestException } from '@nestjs/common';

export class AlreadyExistsException extends BadRequestException {
    constructor(item?: string) {
        super(`${item ?? 'Item'} with given credentials already exists`);
    }
}
