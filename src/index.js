import foo from './foo'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css'
import './styles/demo.less'

foo()

const a = 123

console.log(a)

const todos = [
  '吃饭',
  '睡觉'
]

todos.forEach(item => {
  console.log(item)
})
