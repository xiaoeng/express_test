import "dotenv/config"
import express from 'express';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
let tea = []
let count = 1



//添加
app.post("/createTea", (req, res) => {
  const { name, price } = req.body
  const newTea = {
    id: count++,
    name,
    price
  }
  tea.push(newTea)
  res.status(201).send(newTea)
})

// 获取所有的tea
app.get("/getAllTea", (req, res) => {
  res.status(200).send(tea)
})

//put
app.put("/tea/:id", (req, res) => {
  const tea = tea.find((t) => t.id === parseInt(req.params.id))
  if (!tea) {
    return res.status(404).send("tea not found")
  }
  //找到对应的元素
  const { name, price } = req.body
  console.log(name, price)
  tea.name = name
  tea.price = price
  res.status(200).send(tea)
})

// 根据ID来获取
app.get("/tea/:id", (req, res) => {
  const Tea = tea.find((t) => t.id === parseInt(req.params.id))
  if (!Tea) {
    return res.status(404).send("tea not found")
  }
  res.status(200).send(Tea)
})
app.listen(port, () => {
  console.log(port)
  console.log("This is  work")
})

//delete
app.delete("/tea/:id", (req, res) => {
  console.log("object")
  //该方法找不到就返回-1 找得到返回该元素对应的索引
  const index = tea.findIndex((t) => t.id === parseInt(req.params.id))
  if (index === -1) {
    return
  }
  //找得到删除 参数1：从哪个索引开始 参数2：删除的个数
  tea.splice(index, 1)
  return res.status(204).send("deleted")
})