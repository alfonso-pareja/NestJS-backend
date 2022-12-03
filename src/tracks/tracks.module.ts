import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MemoryStorage } from "src/common/memory-storage";
import { TracksController } from "./tracks.controller";
import { TracksService } from "./tracks.service";


@Module({
    imports: [HttpModule],
    controllers: [TracksController],
    providers: [TracksService, MemoryStorage],
    exports: [TracksService],
})
export class TracksModule { }