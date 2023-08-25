import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { TimelineGroup, TimelineItem } from './models/TimelineModel';
import bodyParser from 'body-parser';
import { FileBasedDB } from './data/FileBasedDB';

const app: Express = express();
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors());
const port = 8000;

const itemDb = new FileBasedDB({ type: "item" })
const groupDb = new FileBasedDB({ type: "group" })

app.get('/item', jsonParser, (req: Request, res: Response) => {
  itemDb.get().then(item => res.send(item));
});

app.post('/item', jsonParser, (req: Request, res: Response) => {
  let item: TimelineItem = req.body
  itemDb.put(item.id, item)
  res.send(item)
});

app.put('/item/:id', jsonParser, (req: Request, res: Response) => {
  let item: TimelineItem = req.body as TimelineItem
  itemDb.put(req.params.id, item)
  res.send(item)
});

app.delete('/item/:id', jsonParser, (req: Request, res: Response) => {
  itemDb.delete(req.params.id)
  res.send()
});

app.get('/group', jsonParser, (req: Request, res: Response) => {
  groupDb.get().then(item => res.send(item));
});

app.post('/group', jsonParser, (req: Request, res: Response) => {
  let group: TimelineGroup = req.body
  groupDb.put(group.id, group)
  res.send(group)
});

app.put('/group/:id', jsonParser, (req: Request, res: Response) => {
  let group: TimelineGroup = req.body
  groupDb.put(req.params.id, group)
  res.send(group)
});

app.delete('/group/:id', jsonParser, (req: Request, res: Response) => {
  console.log(req.params.id)
  groupDb.delete(req.params.id)
  res.send()
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});