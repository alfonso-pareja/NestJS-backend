import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IResponse, ISong } from './interfaces/tracks.interface';
import { IApiResponse, IApiResult } from './interfaces/itunes.interface';
import { IMemory } from '../common/interfaces/memory-storage.interface';
import { MemoryStorage } from '../common/memory-storage';
import { MediaType } from './dto/track.dto';
import { FavoriteSongs } from './dto/favorite.dto';
import { iTunes } from './class/itunes.class';
import * as moment from 'moment';

@Injectable()
export class TracksService {

    API_ITUNES = 'https://itunes.apple.com'
    constructor(private http: HttpService, private memo: MemoryStorage){}

    /**
     * Obtener canciones por nombre de Banda
     * @param name 
     * @param limit 
     * @param media 
     * @returns Promise<IResponse> 
     */
    async getTrackByTerm(name: string, limit?: number, media?: MediaType): Promise<IResponse> {

        // Valida que exista el nombre del artista y no este vacio
        if (!String(name).trim().length)
            return {
                status: false,
                message: 'Debes ingresar el nombre de la banda!',
                data: null
            };


        // Se obtienen las canciones segun nombre de banda enviada
        const songs: IApiResult[] = await this.getSongs(name, media, limit);
        
        // Si no existen resultados, se termina la ejecucion
        if (!songs.length)
            return {
                status: false,
                message: 'No se encontraron resultados',
                data: null
            };


        const albums = this.getUniqueAlbums(songs);

        // TEST Cache
        // await new Promise(resolve => { setTimeout(() => { resolve(true) }, 3000)})
        
        return {
            status: true,
            message: `Resultados para la busqueda de ${name}`,
            data: {
                total_albumes: albums.length,
                total_canciones: songs.length,
                albumes: albums,
                canciones: this.songToModel(songs)
            }
        };
    }



    /**
     * Agrega una cancion a favoritos
     * @param favoriteSong 
     * @returns 
     */
    async setFavorites(favoriteSong: FavoriteSongs): Promise<IResponse>{
        const songsApi: IApiResult[] = await this.getSongs(favoriteSong.nombre_banda, 'music');

        const isValidSong = songsApi.some(
            (song) => 
                (song.artistName).toLowerCase() == (favoriteSong.nombre_banda).toLowerCase() &&
                song.trackId == favoriteSong.cancion_id
        );

        if(!isValidSong)
            return {
                status: false,
                message: 'El id enviado no pertenece a una cancion valida.',
                data: null
            }



        // Se almacenan en una memoria temporal los favoritos
        const favorite = this.memo.getMemoryByKey('favorites');

        //Si no existe en favorito, se crea y guarda el nuevo favorito
        if(!favorite){
            this.memo.addToMemoryStorage({ key: 'favorites', value: Array(favoriteSong) })
            return {
                status: true,
                message: 'Registro ingresado.',
                data: null
            }
        }

        const inMemory = (favorite.value)
            .some((song) => song.cancion_id == favoriteSong.cancion_id);

        if(inMemory)
            return {
                status: false,
                message: 'El id de la cancion enviado, ya se encuentra en favoritos.',
                data: null
            }

        // Se agrega a los favoritos
        favorite.value.push(favoriteSong)
        
        return { status: true, message: 'OK', data: null }
    }


    /**
     * Obtiene las canciones guardadas en favoritos
     * @returns 
     */
    async getFavorites(): Promise<IResponse>{
        const favorites: IMemory = this.memo.getMemoryByKey('favorites');
        return { status: true, message: 'OK', data: favorites && favorites.value || null }
    }



    /**
     * Se arma la estructura de respuesta solicitada
     * @param songs 
     * @returns 
     */
    songToModel(songs: IApiResult[]): ISong[] {
        return songs.map((song) => {
            return {
                cancion_id:     song.trackId,
                nombre_album:   song.collectionName,
                nombre_tema:    song.trackName,
                preview_url:    song.previewUrl,
                fecha_lanzamiento: moment(song.releaseDate).format('YYYY-MM-DD'),
                precio: {
                  moneda: song.currency,
                  valor:  song.collectionPrice.toString(),
                },
            }
        })
    }


    
    /**
     * Obtiene los albums de manera unica y los retorna en un array
     * @param songs 
     * @returns 
     */
    getUniqueAlbums(songs: IApiResult[]) {
        return Array.from(new Set((songs).map((song) => song.collectionName)) )
    }


    /**
     * Obtiene las canciones desde iTunes
     * @param query 
     * @returns Promise<IApiResult[]>
     */
    async getSongs(name: string, media?: MediaType, limit?: number): Promise<IApiResult[]> {
        // Se solicita obtener los primeros 25 resultados y que solo sean canciones
        // Segun la documentacion de la api de iTunes se le puede enviar un limitador de resultados y tipo de media para obtener solo canciones.
        // (https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html)

        let q = `?term=${name}`
            q += media ? '&media='+media : '';
            q += limit ? '&limit='+limit : '&limit=25';

        return await firstValueFrom(
                this.http.get<IApiResponse>(`${this.API_ITUNES}/search${q}`) 
            ).then(
                (response) => response && response.data && response.data.results.length
                ? (response.data.results).map((song) => new iTunes().toObject(song) )
                : []
            ).catch((err) => { console.log(err); return [] })
    }



}
