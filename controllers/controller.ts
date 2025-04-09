import { Request, Response } from "express";

const test1 = async (req: Request, res: Response) => {
  console.log("=== test1 started ===");
  const body = req.body
  const params = req.params
  const query = req.query
  try {
    console.log("test1 body", body)
    console.log("test1 params", params)
    console.log("test1 query", query)
    res.send("test1 success")
  } catch (error) {
    console.error('test1 failed:', error)
    res.status(404).send('test1 failed')
  }
  console.log("--- test1 done ---");
};


module.exports = {
  test1
};