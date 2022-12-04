import { CacheModule, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { TracksController } from '../src/tracks/tracks.controller';
import { TracksService } from '../src/tracks/tracks.service';
import { MemoryStorage } from '../src/common/memory-storage';
import * as request from 'supertest';

describe('TracksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/search_tracks (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/search_tracks?term=Pearl Jam&limit=5&&media=music`)
      .expect(200);

    const res = response.body;

    expect(res.data).toHaveProperty('canciones');
    expect(res.data).toHaveProperty('total_albumes');
    expect(res.data).toHaveProperty('total_canciones');
    expect(res.data).toHaveProperty('albumes');
  });


  it('/favorites (POST)', async () => {
    const bodyTest = {
      nombre_banda: "Pearl Jam",
      cancion_id: 158049842,
      usuario: "Sebastian",
      ranking: "5/5"
    }

    const response = await request(app.getHttpServer())
      .post('/api/favorites')
      .send(bodyTest)
      .expect(201);

    const res = response.body;

    expect(res).toHaveProperty('message');
    expect(res.message).toEqual('Registro ingresado.');
  })


  it('/favorites (GET)', async() => {
    const response = await request(app.getHttpServer())
      .get(`/api/favorites`)
      .expect(200);

    const res = response.body;

    //debiera existir un solo registro
    const data = (res.data).shift();

    expect(data).toHaveProperty('nombre_banda');
    expect(data).toHaveProperty('cancion_id');
    expect(data).toHaveProperty('usuario');
    expect(data).toHaveProperty('ranking');

    expect(data.nombre_banda).toEqual('Pearl Jam')
    expect(data.cancion_id).toEqual(158049842)
    expect(data.usuario).toEqual('Sebastian')
    expect(data.ranking).toEqual('5/5')
  })





});
