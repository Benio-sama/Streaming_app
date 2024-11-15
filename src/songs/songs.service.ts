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
    try {
      return this.db.song.findMany();
    } catch (error) {
      return 'nincs ilyen zeneszam';
    }
  }

  findOne(id: number) {
    if (id === undefined || id === null || isNaN(id)) {
      return 'az id-nek szamnak kell lennie';
    }
    try {
      return this.db.song.findUnique({
        where: { id: id },
      });
    } catch (error) {
      return "nincs ilyen id-vel rendelkezo zeneszam";
    }
  }

  free() {
    try {
      return this.db.song.findMany({
        where: {
          price: 0
        }
      });
    } catch (error) {
      return 'hiba tortent';
    }
  }

  top(mennyi: number) {
    try {
      if (mennyi == 0 || mennyi == undefined || isNaN(mennyi)) {
        mennyi = 10;
      }
      return this.db.song.findMany({
        orderBy: {
          rating: 'desc'
        },
        take: mennyi,
      });
    } catch (error) {
      return 'hiba tortent';
    }

  }

  async popular() {
    try {
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
    } catch (error) {
      return 'hiba tortent';
    }
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    if (id === undefined || id === null || isNaN(id)) {
      return 'az id-nek szamnak kell lennie';
    }
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
    if (id === undefined || id === null || isNaN(id)) {
      return 'az id-nek szamnak kell lennie';
    }
    try {
      return this.db.song.delete({
        where: { id: id }
      })
    } catch (error) {
      return "nincs ilyen id-val rendelkezo song";
    }
  }
}
