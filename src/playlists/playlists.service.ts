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
    if (isNaN(listid) || isNaN(songid) || listid === undefined || songid === undefined || listid === null || songid === null) {
      return 'az id-nek szamnak kell lennie';
    }
    try {
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
    } catch (error) {
      return 'hiba: valamelyik id-vel nincs szam es/vagy lista'
    }
  }

  removeSongs(listid: number, songid: number) {
    if (isNaN(listid) || isNaN(songid) || listid === undefined || songid === undefined || listid === null || songid === null) {
      return 'az id-nek szamnak kell lennie';
    }
    try {
      return this.db.playlist.update({
        where: { id: listid },
        data: {
          songs: {
            disconnect: { id: songid }
          }
        },
        include: {
          songs: true,
        }
      })
    } catch (error) {
      return 'hiba: valamelyik id-vel nincs szam es/vagy lista'
    }
  }

  findAll() {
    try {
      return this.db.playlist.findMany();
    } catch (error) {
      return 'nincs lejatszasi lista';
    }
  }

  findOne(id: number) {
    if (id === undefined || id === null || isNaN(id)) {
      return 'az id-nek szamnak kell lennie';
    }
    try {
      return this.db.playlist.findUnique({
        where: { id: id },
        include: {
          songs: true,
        }
      });
    } catch (error) {
      return 'nincs ilyen id-vel rendelkezo lista';
    }
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    if (id === undefined || id === null || isNaN(id)) {
      return 'az id-nek szamnak kell lennie';
    }
    try {
      return this.db.playlist.update({
        data: updatePlaylistDto,
        where: { id: id },
      });
    } catch (error) {
      return 'nincs ilyen id-vel rendelkezo lista';
    }
  }

  remove(id: number) {
    if (id === undefined || id === null || isNaN(id)) {
      return 'az id-nek szamnak kell lennie';
    }
    try {
      return this.db.playlist.delete({
        where: { id: id }
      });
    } catch (error) {
      return 'nincs ilyen id-vel rendelkezo lista';
    }
  }
}