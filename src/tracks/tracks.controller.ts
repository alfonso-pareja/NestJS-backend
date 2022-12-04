import { 
    CacheInterceptor, 
    Body,
    CacheKey, 
    Controller, 
    Get, 
    Post, 
    Query, 
    UseInterceptors 
} from '@nestjs/common';
import { FavoriteSongs } from './dto/favorite.dto';
import { QueryTracksDTO } from './dto/track.dto';
import { IResponse } from './interfaces/tracks.interface';
import { TracksService } from './tracks.service';

@Controller('api')
@UseInterceptors(CacheInterceptor)
export class TracksController {

    constructor(private readonly service: TracksService) {}
    

    @CacheKey('cache_search_tracks')
    @Get('search_tracks')
    async getTracksByTerm(@Query() query: QueryTracksDTO): Promise<IResponse>{
        return this.service.getTrackByTerm(query.term, query.limit, query.media);
    }

    @Get('favorites')
    async getFavorites(){
        return this.service.getFavorites();
    }

    @Post('favorites')
    async setFavorites(@Body() favoriteSong: FavoriteSongs) {
        return this.service.setFavorites(favoriteSong);
    }
    


}
