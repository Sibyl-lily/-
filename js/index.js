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

// 退出登录
function logout() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    
    axios.get(`http://localhost:8888/users/logout/${userInfo.id}`)
        .then(res => {
            if(res.data.code === 1) {
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                alert('退出成功')
                checkLogin()
            } else {
                alert(res.data.message)
            }
        })
        .catch(err => {
            alert('退出失败')
        })
}

// 初始化轮播图
function initSwiper() {
    new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        autoHeight: true,
        touchRatio: 1,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
    });
}

// 页面加载完成检查登录状态
window.onload = function() {
    checkLogin();
    initSwiper();
} 