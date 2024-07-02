import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEYS = 'permissions';

export const Permission = (...permissions: string[]) =>
  SetMetadata(PERMISSION_KEYS, permissions);
