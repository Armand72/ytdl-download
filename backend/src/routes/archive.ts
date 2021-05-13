import express from 'express';
import ytdl from 'ytdl-core';
import * as fs from 'fs';
import archiver from 'archiver';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

const router = express.Router({ mergeParams: true });

interface ListProps {
  list: string[];
}

router.post('/', async (req, res) => {
  const zipName = `music_${uuidv4()}`;
  const output = fs.createWriteStream(`${__dirname}/${zipName}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  const { list }: ListProps = req.body;
  const array: string[] = [];

  const iterate = async () => {
    // permet de finir les promesses dans le bon ordre
    await list.reduce(async (promise, file) => {
      // This line will wait for the last async function to finish.
      // The first iteration uses an already resolved Promise
      // so, it will immediately continue.
      await promise;
      const info = await ytdl.getInfo(file);
      const {
        author: { name },
        title,
      } = info.videoDetails;
      array.push(`${name}_${title}`);
    }, Promise.resolve());
  };

  await iterate();

  // https://www.youtube.com/watch?v=WoX6BW5RCSM&list=RDMMWoX6BW5RCSM&start_radio=1&ab_channel=Caparezza-Topic

  list.forEach((videoUrl, i) => {
    const stream = ytdl(videoUrl, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });

    archive.append(stream, { name: `${array[i]}${i}.mp3` });
  });

  archive.pipe(output);

  await archive.finalize();
  res.send({ status: 200, zipName });
});

router.get('/:zipName', async (req, res) => {
  const { zipName } = req.params;
  const coolPath = path.join(__dirname, `${zipName}.zip`);

  res.download(coolPath);
});

export default router;
