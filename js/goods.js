// 全局变量
let currentPage = 1;
let pageSize = 12;
let total = 0;

// 检查登录状态
function checkLogin() {
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    
    if(token && userInfo) {
        document.getElementById('welcome-text').textContent = `欢迎您, ${userInfo.nickname || userInfo.username}`
        document.getElementById('logout-btn').style.display = 'inline'
        document.getElementById('user-center').style.display = 'inline'
        document.getElementById('login-link').style.display = 'none'
    } else {
        document.getElementById('welcome-text').textContent = '您好!'
        document.getElementById('logout-btn').style.display = 'none'
        document.getElementById('user-center').style.display = 'none'
        document.getElementById('login-link').style.display = 'inline'
    }
}

// 获取商品列表
function fetchGoodsList() {
    axios.get(`http://localhost:8888/goods/list?current=${currentPage}&pagesize=${pageSize}`)
        .then(res => {
            if(res.data.code === 1) {
                renderGoodsList(res.data.list);
                total = res.data.total;
                updatePagination();
            } else {
                alert('获取商品列表失败：' + res.data.message);
            }
        })
        .catch(err => {
            console.error('获取商品列表出错：', err);
            alert('获取商品列表失败，请稍后重试');
        });
}

// 渲染商品列表
function renderGoodsList(goods) {
    const goodsList = document.getElementById('goodsList');
    goodsList.innerHTML = goods.map(item => `
        <div class="goods-item">
            <a href="./goods-detail.html?id=${item.goods_id}" class="goods-link">
                <img src="${item.img_big_logo}" alt="${item.title}">
                <div class="goods-info">
                    <h3 class="goods-title">${item.title}</h3>
                    <div class="price-info">
                        <span class="current-price">￥${item.current_price}</span>
                        ${item.is_sale ? `
                            <span class="original-price">￥${item.price}</span>
                            <span class="discount">${item.sale_type}</span>
                        ` : ''}
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// 更新分页信息
function updatePagination() {
    const totalPages = Math.ceil(total / pageSize);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
}

// 分页控制函数
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchGoodsList();
    }
}

function nextPage() {
    const totalPages = Math.ceil(total / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        fetchGoodsList();
    }
}

function goToPage(page) {
    currentPage = page;
    fetchGoodsList();
}

function goToLastPage() {
    currentPage = Math.ceil(total / pageSize);
    fetchGoodsList();
}

function changePageSize(size) {
    pageSize = parseInt(size);
    currentPage = 1;
    fetchGoodsList();
}

// 退出登录
function logout() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    
    axios.get(`http://localhost:8888/users/logout/${userInfo.id}`)
        .then(res => {
            if(res.data.code === 1) {
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                alert('退出成功')
                window.location.href = './index.html'
            } else {
                alert(res.data.message)
            }
        })
        .catch(err => {
            alert('退出失败')
        })
}

// 页面加载完成后执行
window.onload = function() {
    checkLogin();
    fetchGoodsList();
} 