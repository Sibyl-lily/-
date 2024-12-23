let currentPage = 1
let pageSize = 12
let totalPages = 1

// 获取商品列表
function getGoodsList() {
    axios.get(`http://localhost:8888/goods/list?current=${currentPage}&pagesize=${pageSize}`)
        .then(res => {
            if(res.data.code === 1) {
                const list = res.data.list
                const total = res.data.total
                totalPages = Math.ceil(total / pageSize)
                
                // 更新页码信息
                document.getElementById('currentPage').textContent = currentPage
                document.getElementById('totalPages').textContent = totalPages
                
                // 渲染商品列表
                const html = list.map(item => `
                    <div class="goods-item">
                        <img src="${item.img_big_logo}" onclick="toDetail(${item.goods_id})" alt="${item.title}">
                        <div class="title">${item.title}</div>
                        <div class="price">￥${item.current_price}</div>
                    </div>
                `).join('')
                
                document.getElementById('goodsList').innerHTML = html
            }
        })
}

// 跳转到指定页
function toPage(page) {
    if(page < 1 || page > totalPages) {
        alert('页码超出范围')
        return
    }
    currentPage = page
    getGoodsList()
}

// 改变每页显示数量
function changePageSize() {
    pageSize = document.getElementById('pageSize').value
    currentPage = 1
    getGoodsList()
}

// 跳转页面
function jumpToPage() {
    const page = parseInt(document.getElementById('jumpPage').value)
    toPage(page)
}

// 跳转到商品详情
function toDetail(id) {
    location.href = `./goods-detail.html?id=${id}`
}

// 页面加载完成
window.onload = getGoodsList 