import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaylistsService {
  constructor(private db: PrismaService) { }
  create(createPlaylistDto: CreatePlaylistDto) {
    return this.db.playlist.create({
      data: createPlaylistDto,
    })
  }

  addSongs(listid: number, songid: number) {
    return this.db.playlist.update({
      where: { id: listid },
      data: {
        songs: {
          connect: { id: songid }
        }
      },
      include: {
        songs: true,
      }
    })
  }


  findAll() {
    return this.db.playlist.findMany();
  }

  findOne(id: number) {
    try {
      return this.db.playlist.findUnique({
        where: { id: id },
        include: {
          songs: true,
        }
      });
    } catch (error) {
      return undefined;
    }
  }



  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
