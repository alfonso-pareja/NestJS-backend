import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class FavoriteSongs {

    @IsString()
    @IsNotEmpty()
    nombre_banda: string;
  
    @IsNumber()
    cancion_id: number;
  
    @IsString()
    @IsNotEmpty()
    usuario: string;
  
    @IsString()
    ranking: string;
    
}