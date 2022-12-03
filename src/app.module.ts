import { CacheModule, Module } from '@nestjs/common';
import { MemoryStorage } from './common/memory-storage';
import { TracksModule } from './tracks/tracks.module';


@Module({
  imports: [
    CacheModule.register({
      ttl: 3600,
      max: 10,
      isGlobal: true
    }), 
    TracksModule
  ],
  controllers: [],
  providers: [MemoryStorage],
})
export class AppModule {}
