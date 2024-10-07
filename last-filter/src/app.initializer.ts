import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  InsertRoleService,
  InserUserService,
} from './modules/auth/services/insert-init';

@Injectable()
export class AppInitializer implements OnModuleInit {
  constructor(
    private readonly roleService: InsertRoleService,
    private readonly userService: InserUserService,
  ) {}

  async onModuleInit() {
    await this.roleService.insertRoles();
    await this.userService.insertAdminUser();
  }
}
