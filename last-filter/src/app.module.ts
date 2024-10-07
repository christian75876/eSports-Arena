import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppInitializer } from './app.initializer';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [],
  providers: [AppInitializer],
})
export class AppModule {}
