import { SetMetadata } from '@nestjs/common';

export const Reject = () => SetMetadata('reject', true);
