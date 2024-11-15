import { IsArray, IsDefined, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsDefined()
    @IsString()
    name: string;
}
