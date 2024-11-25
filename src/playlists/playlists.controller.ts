import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) { }

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Patch(':listid/:songid')
  modify(@Param('listid') listid: string, @Param('songid') songid: string, @Query('action') action: 'add' | 'remove') {
    if (action === 'add') {
      return this.playlistsService.addSongs(+listid, +songid);
    } else if (action === 'remove') {
      return this.playlistsService.removeSongs(+listid, +songid);
    } else {
      return 'nincs (ilyen) action! az action-nek vagy "add"-nak vagy "remove"-nak kell lennie';
    }
  }

  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }
}
