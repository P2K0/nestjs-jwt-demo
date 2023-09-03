import { SetMetadata } from '@nestjs/common';

import { GUARD_CONFIG } from '@/config/index.config';

export const IsPublic = () => SetMetadata(GUARD_CONFIG.IS_PUBLIC, true);
