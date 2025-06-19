import { Request, Response } from "express";
import path from "path";

const test1 = async (req: Request, res: Response) => {
  console.log("=== test1 started ===");
  const body = req.body
  const params = req.params
  const query = req.query
  try {
    // @ts-ignore
    console.log(req.headers["x-memori-user-email"])
    console.log(req.headers)
    console.log("body", body)
    console.log("params", params)
    console.log("query", query)
    const filePath = "assets/AISuru AI Academy giorno 1 mattina.txt"
    res.sendFile(path.join(__dirname, '..', filePath), (err) => {
      if (err) {
        console.error('Error sending file:', err)
        res.status(err instanceof Error && 'status' in err ? (err as any).status : 500).end()
      }
      else {
        console.log('File sent successfully')
      }
    })
  } catch (error) {
    console.error('test1 failed:', error)
    res.status(404).send('test1 failed')
  }
  console.log("--- test1 done ---");
};

const test1 = async (req: Request, res: Response) => {
  console.log("=== test2 started ===");
  const body = req.body
  const params = req.params
  const query = req.query
  try {
    console.log("body", body)
    console.log("params", params)
    console.log("query", query)
    console.log("test2 successful")
    res.status(200).send("test2 successful")
  } catch (error) {
    console.error('test2 failed:', error)
    res.status(404).send('test2 failed')
  }
  console.log("--- test2 done ---");
};


module.exports = {
  test1,
  test2
};
