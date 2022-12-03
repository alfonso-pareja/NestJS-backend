
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export type MediaType = "movie" | "podcast" | "music" | "musicVideo" | "audiobook" | "shortFilm" | "tvShow" | "software" | "ebook" | "all";

export class QueryTracksDTO {
    @IsString()
    @IsNotEmpty()
    readonly term: string;

    readonly limit?: number;
    readonly media?: MediaType;
}