import { IsArray, IsDefined, IsInt, IsString, Max, Min } from "class-validator";


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
    @Min(1)
    @Max(5)
    rating: number;

}
