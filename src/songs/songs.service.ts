import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(private db: PrismaService) { }

  create(createSongDto: CreateSongDto) {
    return this.db.song.create({
      data: createSongDto
    });
  }

  findAll() {
    return this.db.song.findMany();
  }

  findOne(idparam: number) {
    try {
      return this.db.song.findUnique({
        where: { id: idparam },
      });
    } catch (error) {
      return "nincs ilyen idval rendelkezo song";
    }
  }

  free() {
    return this.db.song.findMany({
      where: {
        price: 0
      }
    });
  }

  top(param: string) {
    try {
      let szam = parseInt(param);
      if (szam == 0 || szam == undefined || Number.isNaN(szam)) {
        szam = 10;
      }
      return this.db.song.findMany({
        orderBy: {
          rating: 'desc'
        },
        take: szam,
      });
    } catch (error) {
      return undefined;
    }

  }

  async popular() {
    const res = await this.db.song.groupBy({
      by: 'artist',
      _count: {
        artist: true
      },
      orderBy: {
        _count: {
          artist: 'desc'
        }
      }
    });

    return res.map((group) => ({
      artist: group.artist,
      numberOfSongs: group._count.artist
    }))
  }

  playlists() {
    return this.db.song.findMany({
      include: {
        playlists: true
      },
      where: {
        playlists: {
          some: {
            name: 'ATE'
          }
        }
      }
    })
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    try {
      return this.db.song.update({
        data: updateSongDto,
        where: { id: id }
      })
    } catch (error) {
      return "nincs ilyen id-val rendelkezo song";
    }
  }

  remove(id: number) {
    try {
      return this.db.song.delete({
        where: { id: id }
      })
    } catch (error) {
      return "nincs ilyen id-val rendelkezo song";
    }
  }
}
