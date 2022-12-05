import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MemoryStorage } from '../common/memory-storage';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

describe('TracksService.getTrackByTerm', () => {
  let service: TracksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,     
        CacheModule.register({
          ttl: 3600,
          max: 10,
          isGlobal: true
        })
      ],
      controllers: [TracksController],
      providers: [TracksService, MemoryStorage],
    }).compile();

    service = module.get<TracksService>(TracksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all songs by term', async() => {
    const expectResult = {
      "status": true,
      "message": "Resultados para la busqueda de Pearl Jam",
      "data": {
        "total_albumes": 2,
        "total_canciones": 5,
        "albumes": [
          "Rearviewmirror: Greatest Hits 1991-2003",
          "Ten"
        ],
        "canciones": [
          {
            "cancion_id": 158051033,
            "nombre_album": "Rearviewmirror: Greatest Hits 1991-2003",
            "nombre_tema": "Better Man",
            "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b1/19/1f/b1191ff2-2374-5e74-7457-f3d978c4a556/mzaf_3895947985215855733.plus.aac.p.m4a",
            "fecha_lanzamiento": "1994-11-22",
            "precio": {
              "moneda": "USD",
              "valor": "14.99"
            }
          },
          {
            "cancion_id": 158051513,
            "nombre_album": "Rearviewmirror: Greatest Hits 1991-2003",
            "nombre_tema": "Yellow Ledbetter",
            "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/96/22/ad/9622ad18-af9d-c2eb-27ea-fe985f2bcdb9/mzaf_13217898645824320236.plus.aac.p.m4a",
            "fecha_lanzamiento": "1991-08-27",
            "precio": {
              "moneda": "USD",
              "valor": "14.99"
            }
          },
          {
            "cancion_id": 425465351,
            "nombre_album": "Ten",
            "nombre_tema": "Black",
            "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/5f/b2/00/5fb200d2-b570-79ed-16fe-6e3f0a5b4332/mzaf_7238181917484232738.plus.aac.p.m4a",
            "fecha_lanzamiento": "1991-08-27",
            "precio": {
              "moneda": "USD",
              "valor": "9.99"
            }
          },
          {
            "cancion_id": 158049842,
            "nombre_album": "Rearviewmirror: Greatest Hits 1991-2003",
            "nombre_tema": "Even Flow",
            "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/69/c5/d0/69c5d013-7338-b1e8-1aa7-e9c1cf365e83/mzaf_6081655695052355680.plus.aac.p.m4a",
            "fecha_lanzamiento": "1991-08-27",
            "precio": {
              "moneda": "USD",
              "valor": "14.99"
            }
          },
          {
            "cancion_id": 158049848,
            "nombre_album": "Rearviewmirror: Greatest Hits 1991-2003",
            "nombre_tema": "Jeremy",
            "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/28/1c/5e/281c5ed6-d0e9-f765-1f29-d03d0958fdb5/mzaf_6915829412169279127.plus.aac.p.m4a",
            "fecha_lanzamiento": "1991-08-27",
            "precio": {
              "moneda": "USD",
              "valor": "14.99"
            }
          }
        ]
      }
    }
    const result = await service.getTrackByTerm('Pearl Jam', 5, 'music');
    expect(result).toEqual(expectResult);
  });


  it('should store favorites songs', async () => {
    const expectResult = {
      "status": true,
      "message": "Registro ingresado.",
      "data": null
    }

    const bodyTest = {
      "nombre_banda": "Pearl Jam",
      "cancion_id": 158049842,
      "usuario": "Sebastian",
      "ranking": "5/5"
    }

    const result = await service.setFavorites(bodyTest)
    expect(result).toEqual(expectResult);
  })

  it('should find all favorites songs', async () => {
    const expectResult = {
      "status": true,
      "message": "Favoritos",
      "data": [
          {
              "nombre_banda": "Pearl Jam",
              "cancion_id": 158049842,
              "usuario": "Sebastian",
              "ranking": "5/5"
          }
      ]
    }

    const result = await service.getFavorites()
    expect(result).toEqual(expectResult);
  })


});

