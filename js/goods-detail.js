// 获取URL中的商品ID
function getGoodsId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

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

// 获取商品详情
function fetchGoodsDetail() {
    const goodsId = getGoodsId();
    if (!goodsId) {
        alert('商品ID不存在');
        window.location.href = './goods.html';
        return;
    }

    axios.get(`http://localhost:8888/goods/item?id=${goodsId}`)
        .then(res => {
            if (res.data.code === 1) {
                renderGoodsDetail(res.data.info);
                // 更新页面标题
                document.title = `${res.data.info.title} - 仿站电商平台`;
            } else {
                alert('获取商品详情失败：' + res.data.message);
            }
        })
        .catch(err => {
            console.error('获取商品详情出错：', err);
            alert('获取商品详情失败，请稍后重试');
        });
}

// 渲染商品详情
function renderGoodsDetail(goods) {
    const goodsDetail = document.getElementById('goodsDetail');
    goodsDetail.innerHTML = `
        <div class="goods-preview">
            <img src="${goods.img_big_logo}" alt="${goods.title}" class="goods-image">
        </div>
        <div class="goods-info">
            <h1 class="goods-title">${goods.title}</h1>
            <div class="goods-price">
                <div class="price-box">
                    <span class="price-label">价格：</span>
                    <span class="current-price">￥${goods.current_price}</span>
                    ${goods.is_sale ? `
                        <span class="original-price">￥${goods.price}</span>
                        <span class="discount">${goods.sale_type}</span>
                    ` : ''}
                </div>
            </div>
            <div class="goods-meta">
                <div class="meta-item">
                    <span class="meta-label">商品分类：</span>
                    <span class="meta-value">${goods.category}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">库存数量：</span>
                    <span class="meta-value">${goods.goods_number}</span>
                </div>
                ${goods.is_hot ? '<div class="hot-tag">热销商品</div>' : ''}
            </div>
        </div>
        <div class="goods-detail-content">
            <h2>商品详情</h2>
            <div class="detail-content">
                ${goods.goods_introduce}
            </div>
        </div>
    `;
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
    fetchGoodsDetail();
} 