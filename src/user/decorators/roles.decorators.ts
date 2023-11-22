import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Admin: () => CustomDecorator<string> =
  (): CustomDecorator<string> => SetMetadata('isAdmin', true);

export const Public: () => CustomDecorator<string> =
  (): CustomDecorator<string> => SetMetadata('isPublic', true);
