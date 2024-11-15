import { IsArray, IsDefined, IsInt, IsString } from "class-validator";


export class CreateSongDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    artist: string;

    @IsDefined()
    @IsInt()
    mp: number;

    @IsDefined()
    @IsInt()
    price: number;

    @IsDefined()
    @IsInt()
    rating: number;

}
