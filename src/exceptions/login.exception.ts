import { BadRequestException } from '@nestjs/common';

export class LoginException extends BadRequestException {
    constructor() {
        super(
            "We can't find that account. Please check your details and try again.",
        );
    }
}
