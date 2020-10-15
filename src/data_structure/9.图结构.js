/**
 * 图结构JS实现
 *  addVertex(vertex): 添加顶点的方法
 *  addEdge(v1, v2): 添加边的方法
 *  toString(): 以字符串形式返回
 *  bfs(firstV,handler): (BFS)广度优先搜索
 *  dfs(firstV,handler): (DFS)深度优先搜索
 * 
 * @Author: Jie.Yang
 * @Date: 2020-09-21
 */
const Dictionay = require('./10.字典')
const Queue = require('./2.队列结构')
class Graph {
    constructor() {
        // 数组存顶点  
        this.vertexes = []
        // 字典存边
        this.edges = new Dictionay()
    }

    addVertex(v) {
        this.vertexes.push(v)
        this.edges.set(v, [])
    }

    addEdge(v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }

    toString() {
        // 1. 定义字符串,保存最终的结果
        let resultString = ""

        // 2. 遍历所有的顶点,以及顶点对应的边
        for (let i = 0; i < this.vertexes.length; i++) {
            resultString += this.vertexes[i] + '->'

            let vEdges = this.edges.get(this.vertexes[i])
            for (let j = 0; j < vEdges.length; j++) {
                resultString += vEdges[j] + ' '
            }
            resultString += '\n'
        }

        return resultString
    }

    /**
     * 初始化顶点状态颜色
     * 白色: 表示该顶点从来没有被访问过
     * 灰色: 表示该顶点已经被访问过,但并未探测过
     * 黑色: 表示该顶点即被访问过也被探测过
     */
    initializeColor() {
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = 'white'
        }
        return colors
    }

    // 广度优先搜索
    bfs(initV, handler) {
        // 1. 初始化颜色
        let colors = this.initializeColor()
        // 2. 创建队列
        let queue = new Queue()
        // 3. 将定点加入到队列中
        queue.enqueue(initV)
        // 4. 循环从队列中取出的元素
        while (!queue.isEmpty()) {
            // 从队列中取出一个顶点
            let v = queue.dequeue()
            // 获取和顶点相连的另外顶点
            let vList = this.edges.get(v)
            // v已经被探测 颜色变灰
            colors[v] = 'gray'
            // 遍历所有顶点 加入到队列中
            for (let i = 0; i < vList.length; i++) {
                let e = vList[i]
                if (colors[e] === 'white') {
                    colors[e] = 'gray'
                    queue.enqueue(e)
                }
            }
            // 访问顶点
            handler(v)
            // 5. 将访问过的顶点设置为黑色
            colors[v] = 'black'
        }
    }

    // 深度优先搜索
    dfs(initV, handler) {
        let colors = this.initializeColor()
        this.dfsVisit(initV, colors, handler)
    }
    dfsVisit(v, colors, handler) {
        // 1. 将颜色设置为灰色
        colors[v] = 'gray'
        // 2. 处理v顶点
        handler(v)

        // 3. 访问v相连的其他顶点
        let vList = this.edges.get(v)
        for (let i = 0; i < vList.length; i++) {
            let e = vList[i]
            if (colors[e] === 'white') {
                this.dfsVisit(e, colors, handler)
            }
        }
        // 4. 将V设置成黑色
        colors[v] = 'black'
    }
}

/* 测试代码
let g = new Graph()

let myVertex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertex.length; i++) {
    g.addVertex(myVertex[i])
}

g.addEdge('A', 'B')
g.addEdge('A', 'C')
g.addEdge('A', 'D')
g.addEdge('C', 'D')
g.addEdge('C', 'G')
g.addEdge('D', 'G')
g.addEdge('D', 'H')
g.addEdge('B', 'E')
g.addEdge('B', 'F')
g.addEdge('E', 'I')

let result = ''
g.dfs(g.vertexes[0], function (v) {
    result += v + ' '
})
console.log(result)
*/