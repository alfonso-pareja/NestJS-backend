import { IApiResult } from "../interfaces/itunes.interface";

export class iTunes implements IApiResult {
    artistId: number;
    collectionId: number;
    wrapperType: string;
    artistName: string;
    artistViewUrl: string;
    collectionName: string;
    collectionViewUrl: string;
    collectionCensoredName: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionPrice: number;
    collectionExplicitness: string;
    trackCount: number;
    country: string;
    currency: string;
    releaseDate: string;
    primaryGenreName: string;
    previewUrl: string;
    copyright?: string;
    description?: string;
    kind?: string;
    trackId: number;
    trackName?: string;
    trackCensoredName?: string;
    trackViewUrl?: string;
    artworkUrl30?: string;
    trackPrice?: number;
    trackExplicitness?: string;
    discCount?: number;
    discNumber?: number;
    trackNumber?: number;
    trackTimeMillis?: number;
    isStreamable?: boolean;
    amgArtistId?: number;
    contentAdvisoryRating?: string;
    collectionArtistId?: number;
    collectionArtistName?: string;
    

    toObject(json){
        const iTuneSong = new iTunes();
        if(!json) return iTuneSong;


        iTuneSong.artistId = json.artistId || null
        iTuneSong.collectionId = json.collectionId || null
        iTuneSong.wrapperType = json.wrapperType || null
        iTuneSong.artistName = json.artistName || null
        iTuneSong.artistViewUrl = json.artistViewUrl || null
        iTuneSong.collectionName = json.collectionName || null
        iTuneSong.collectionViewUrl = json.collectionViewUrl || null
        iTuneSong.collectionCensoredName = json.collectionCensoredName || null
        iTuneSong.artworkUrl60 = json.artworkUrl60 || null
        iTuneSong.artworkUrl100 = json.artworkUrl100 || null
        iTuneSong.collectionPrice = json.collectionPrice || null
        iTuneSong.collectionExplicitness = json.collectionExplicitness || null
        iTuneSong.trackCount = json.trackCount || null
        iTuneSong.country = json.country || null
        iTuneSong.currency = json.currency || null
        iTuneSong.releaseDate = json.releaseDate || null
        iTuneSong.primaryGenreName = json.primaryGenreName || null
        iTuneSong.previewUrl = json.previewUrl || null
        iTuneSong.copyright = json.copyright || null
        iTuneSong.description = json.description || null
        iTuneSong.kind = json.kind || null
        iTuneSong.trackId = json.trackId || null
        iTuneSong.trackName = json.trackName || null
        iTuneSong.trackCensoredName = json.trackCensoredName || null
        iTuneSong.trackViewUrl = json.trackViewUrl || null
        iTuneSong.artworkUrl30 = json.artworkUrl30 || null
        iTuneSong.trackPrice = json.trackPrice || null
        iTuneSong.trackExplicitness = json.trackExplicitness || null
        iTuneSong.discCount = json.discCount || null
        iTuneSong.discNumber = json.discNumber || null
        iTuneSong.trackNumber = json.trackNumber || null
        iTuneSong.trackTimeMillis = json.trackTimeMillis || null
        iTuneSong.isStreamable = json.isStreamable || null
        iTuneSong.amgArtistId = json.amgArtistId || null
        iTuneSong.contentAdvisoryRating = json.contentAdvisoryRating || null
        iTuneSong.collectionArtistId = json.collectionArtistId || null
        iTuneSong.collectionArtistName = json.collectionArtistName || null

        return iTuneSong;
    }
}