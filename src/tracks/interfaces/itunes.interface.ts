
export interface IApiResponse {
    resultCount: number;
    results: IApiResult[];
}

export interface IApiResult {
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
}
