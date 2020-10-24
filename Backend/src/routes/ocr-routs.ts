import { getData, updateImageData, uploadImage } from '../controllers/ocr';

export default function setRoutes({ app }: any) {
  app.post('/', async (req: any, res: any) => uploadImage({ req, res }));
  app.get('/', async (req: any, res: any) => getData({ req, res }));
  app.put('/', async (req: any, res: any) => updateImageData({ req, res }));
}
